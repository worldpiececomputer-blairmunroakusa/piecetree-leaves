/****************************************************************
 * Fracpay server CreateMAIN instruction process 
 * blairmunroakusa@.0322.anch.AK			    
 ****************************************************************/

#![allow(non_snake_case)]
use solana_program::{
        account_info::AccountInfo,
        account_info::next_account_info,
        entrypoint::ProgramResult,
        program::invoke_signed,
        program_error::ProgramError,
        program_pack::Pack,
        pubkey::Pubkey,
        sysvar::rent::Rent,
        sysvar::Sysvar,
        msg,
        system_instruction,
    };
use bit_vec::BitVec;
use crate::{
        processor::run::Processor,
        processor::utility::*,
        state::constants::*,
        state::MAIN::*,
        state::PIECE::*,
        state::REF::*,
    };

impl Processor {

    pub fn process_create_main(
        program_id: &Pubkey,
        accounts:   &[AccountInfo],
        bumpMAIN:   u8,
        seedMAIN:   Vec<u8>,
        bumpPIECE:  u8,
        seedPIECE:  Vec<u8>,
        bumpREF:    u8,
        seedREF:    Vec<u8>,
    ) -> ProgramResult {

        // get accounts
        let account_info_iter = &mut accounts.iter();

        let operator    = next_account_info(account_info_iter)?;
        let rent        = next_account_info(account_info_iter)?;
        let pdaMAIN     = next_account_info(account_info_iter)?;
        let pdaPIECE    = next_account_info(account_info_iter)?;
        let pdaREF      = next_account_info(account_info_iter)?;

        // check to make sure tx operator is signer
        if !operator.is_signer {
            msg!("Operator is not signer.");
            return Err(ProgramError::MissingRequiredSignature);
        }


        // calculate rent
        let rentMAIN = Rent::from_account_info(rent)?
            .minimum_balance(SIZE_MAIN.into());
        let rentPIECE = Rent::from_account_info(rent)?
            .minimum_balance(SIZE_PIECE.into());
        let rentREF = Rent::from_account_info(rent)?
            .minimum_balance(SIZE_REF.into());
       
        // create pdaMAIN
        invoke_signed(
        &system_instruction::create_account(
            &operator.key,
            &pdaMAIN.key,
            rentMAIN,
            SIZE_MAIN.into(),
            &program_id
        ),
        &[
            operator.clone(),
            pdaMAIN.clone()
        ],
        &[&[&seedMAIN, &[bumpMAIN]]]
        )?;
        msg!("Successfully created pdaMAIN");

        // create pdaPIECEself
        invoke_signed(
        &system_instruction::create_account(
            &operator.key,
            &pdaPIECE.key,
            rentPIECE,
            SIZE_PIECE.into(),
            &program_id
        ),
        &[
            operator.clone(),
            pdaPIECE.clone()
        ],
        &[&[&seedPIECE, &[bumpPIECE]]]
        )?;
        msg!("Successfully created pdaPIECE");

        // create pdaREFself
        invoke_signed(
        &system_instruction::create_account(
            &operator.key,
            &pdaREF.key,
            rentREF,
            SIZE_REF.into(),
            program_id
        ),
        &[
            operator.clone(),
            pdaREF.clone()
        ],
        &[&[&seedREF, &[bumpREF]]]
        )?;
        msg!("Successfully created pdaREF");

        // get MAIN info
        let mut MAINinfo = MAIN::unpack_unchecked(&pdaMAIN.try_borrow_data()?)?;

        // set flags
        let mut flags = BitVec::from_elem(16, false);
        flags.set(0, false); // MAIN account is 0000
        flags.set(1, false);
        flags.set(2, false); 
        flags.set(3, false); 
        flags.set(4, true);  // MAIN is initialized by default

        // initialize MAIN account data
        MAINinfo.flags = pack_flags(flags);
        MAINinfo.operator = *operator.key;
        MAINinfo.balance = 0;
        MAINinfo.netsum = 0;
        MAINinfo.piececount = 0;
        MAIN::pack(MAINinfo, &mut pdaMAIN.try_borrow_mut_data()?)?;

        // get PIECE info
        let mut PIECEinfo = PIECE::unpack_unchecked(&pdaPIECE.try_borrow_data()?)?;

        // set flags
        let mut flags = BitVec::from_elem(16, false);
        flags.set(0, false); // PIECE self account is 0001
        flags.set(1, false);
        flags.set(2, false); 
        flags.set(3, true); 
        flags.set(4, true); // self PIECE initialized by default

        // initialize self PIECE account data
        PIECEinfo.flags = pack_flags(flags);
        PIECEinfo.operator = *operator.key;
        PIECEinfo.balance = 0;
        PIECEinfo.netsum = 0;
        PIECEinfo.refcount = 0;
        PIECEinfo.pieceslug = pack_pieceslug(seedMAIN);
        PIECE::pack(PIECEinfo, &mut pdaPIECE.try_borrow_mut_data()?)?;

        // get REF info
        let mut REFinfo = REF::unpack_unchecked(&pdaREF.try_borrow_data()?)?;

        // set flags
        let mut flags = BitVec::from_elem(16, false);
        flags.set(0, false); // REF self account is 0010
        flags.set(1, false);
        flags.set(2, true);
        flags.set(3, false);
        flags.set(4, true); // self REF initialized to point to operator MAIN by default

        // initialize self REF account data
        REFinfo.flags = pack_flags(flags);
        REFinfo.target = *pdaMAIN.key;
        REFinfo.fract = 100_000_000;    // new self-ref gets 100% by default
        REFinfo.netsum = 0;
        REFinfo.refslug = pack_refslug("SELF-REFERENCE".as_bytes().to_vec());
        REF::pack(REFinfo, &mut pdaREF.try_borrow_mut_data()?)?;

        Ok(())
    }
}

