/****************************************************************
 * Fracpay server LinkREF instruction process 
 * blairmunroakusa@.0322.anch.AK			    
 ****************************************************************/

#![allow(non_snake_case)]
use solana_program::{
        account_info::AccountInfo,
        account_info::next_account_info,
        entrypoint::ProgramResult,
        program_error::ProgramError,
        program_pack::Pack,
        pubkey::Pubkey,
        msg,
    };
use crate::{
        error::error::FracpayError::InvalidInstruction,
        processor::run::Processor,
        processor::utility::*,
        state::PIECE::*,
        state::REF::*,
        state::constants::*,
    };

impl Processor {

    pub fn process_link_ref(
        program_id: &Pubkey,
        accounts:   &[AccountInfo],
    ) -> ProgramResult {

        // get accounts
        let account_info_iter = &mut accounts.iter();

        let operator    = next_account_info(account_info_iter)?;
        let pdaMAIN    = next_account_info(account_info_iter)?;
        let pdaPIECE    = next_account_info(account_info_iter)?;
        let pdaREF      = next_account_info(account_info_iter)?;
        let inviteKEY   = next_account_info(account_info_iter)?;

        // check to make sure tx operator is signer
        if !operator.is_signer {
            msg!("Operator is not signer.");
            return Err(ProgramError::MissingRequiredSignature);
        }
       
        // get PIECE info
        let PIECEinfo = PIECE::unpack_unchecked(&pdaPIECE.try_borrow_data()?)?;

        // check to make sure tx operator is authorized PIECE operator
        if PIECEinfo.operator != *operator.key {
            msg!("Operator doesn't control PIECE.");
            return Err(ProgramError::MissingRequiredSignature);
        }

        // get REF info
        let mut REFinfo = REF::unpack_unchecked(&pdaREF.try_borrow_data()?)?;

        // generate invite key hash to compare to invite target on REF
        let inviteKEYstring = inviteKEY.key.to_string();
        let inviteKEYhash = hash(inviteKEYstring.as_bytes()).to_bytes();

        // get invite key from REF then convert to 32 byte array
        let KEYhashREF = REFinfo.target.as_bytes()

        msg!("{:?}", inviteKEYhash);
        msg!("{:?}", KEYhashREF);

        if REFinviteKEY != inviteKEYhash {
            msg!("operator does not have the right to claim this REF");
            return Err(FracpayError::BadInviteKeyError);

        REFinfo.target = pdaPIECE;

        // set initialized flag
        REFflags.set(4, true);

        // repack all REF info
        REFinfo.flags = pack_flags(REFflags);
        REF::pack(REFinfo, &mut pdaREF.try_borrow_mut_data()?)?;

        Ok(())
    }
}

