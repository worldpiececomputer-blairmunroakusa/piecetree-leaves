"use strict";
/****************************************************************
 * Fracpay client utility blob					*
 * blairmunroakusa@.0322.anch.AK				*
 ****************************************************************/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.fromUTF8Array = exports.getProgramID = exports.getKeypair = exports.establishOperator = exports.establishConnection = exports.checkProgram = exports.getPIECEs = exports.availableIDcheck = exports.findHash = exports.deriveAddress = exports.u32toBytes = exports.createSeed = exports.unpackFlags = exports.getREFdata = exports.getPIECEdata = exports.getMAINdata = exports.printPIECElist = exports.printREFlist = exports.verboseREFlist = exports.createTX = exports.payTX = exports.initTX = exports.linkTX = exports.newKeyhash = exports.flipflopFlagCheck = exports.busyFlagCheck = exports.initFlagCheck = exports.inviteFlagCheck = exports.connectFlagCheck = exports.reflectFlagCheck = exports.sleep = exports.PROGRAM_KEYPAIR_PATH = exports.PROGRAM_PATH = exports.PROGRAM_KEYFILE = exports.fracpayID = exports.operatorKEY = exports.connection = exports.MAX_FRACT = exports.REF_SIZE = exports.PIECE_SIZE = exports.MAIN_SIZE = exports.REFSLUG_SIZE = exports.PIECESLUG_SIZE = exports.FRACT_SIZE = exports.COUNT_SIZE = exports.LEFT_SIZE = exports.NETSUM_SIZE = exports.BALANCE_SIZE = exports.PUBKEY_SIZE = exports.FLAGS_SIZE = void 0;
exports.REF_DATA_LAYOUT = exports.PIECE_DATA_LAYOUT = exports.MAIN_DATA_LAYOUT = exports.toUTF8Array = void 0;
/****************************************************************
 * imports							*
 ****************************************************************/
var web3_js_1 = require("@solana/web3.js");
var os = require("os");
var fs = require("mz/fs");
var path = require("path");
var yaml = require("yaml");
var BufferLayout = require("buffer-layout");
var BigNumber = require("bignumber.js");
var BN = require("bn.js");
var bs58 = require("bs58");
var lodash = require("lodash");
var crypto = require('crypto-js');
/****************************************************************
 * declare constants						*
 ****************************************************************/
exports.FLAGS_SIZE = 2;
exports.PUBKEY_SIZE = 32;
exports.BALANCE_SIZE = 8;
exports.NETSUM_SIZE = 8;
exports.LEFT_SIZE = 8;
exports.COUNT_SIZE = 2;
exports.FRACT_SIZE = 4;
exports.PIECESLUG_SIZE = 67; // 63 + 4
exports.REFSLUG_SIZE = 20; // 16 + 4
exports.MAIN_SIZE = exports.FLAGS_SIZE +
    exports.PUBKEY_SIZE +
    exports.BALANCE_SIZE +
    exports.NETSUM_SIZE +
    exports.COUNT_SIZE; // = 52
exports.PIECE_SIZE = exports.FLAGS_SIZE +
    exports.PUBKEY_SIZE +
    exports.BALANCE_SIZE +
    exports.NETSUM_SIZE +
    exports.LEFT_SIZE +
    exports.COUNT_SIZE +
    exports.PIECESLUG_SIZE; // = 127
exports.REF_SIZE = exports.FLAGS_SIZE +
    exports.PUBKEY_SIZE +
    exports.NETSUM_SIZE +
    exports.FRACT_SIZE +
    exports.REFSLUG_SIZE; // = 66
exports.MAX_FRACT = 100000000;
exports.PROGRAM_KEYFILE = "fracpay_server-keypair.json";
exports.PROGRAM_PATH = path.resolve("/Users/blairmunroakusa/_ROOT/___LEAF/fracpay/fracpay_server/target/deploy");
exports.PROGRAM_KEYPAIR_PATH = path.join(exports.PROGRAM_PATH, exports.PROGRAM_KEYFILE);
/****************************************************************
 * general functions						*
 ****************************************************************/
/**
* sleep
**/
function sleep(millis) {
    return new Promise(function (resolve) { return setTimeout(resolve, millis); });
}
exports.sleep = sleep;
/**
* check reflection flag
**/
function reflectFlagCheck(flags) {
    var flagarray = unpackFlags(flags);
    return flagarray[7] === 1;
}
exports.reflectFlagCheck = reflectFlagCheck;
/**
* check connection flag
**/
function connectFlagCheck(flags) {
    var flagarray = unpackFlags(flags);
    return flagarray[5] === 1;
}
exports.connectFlagCheck = connectFlagCheck;
/**
* check invitation flag
**/
function inviteFlagCheck(flags) {
    var flagarray = unpackFlags(flags);
    return flagarray[6] === 1;
}
exports.inviteFlagCheck = inviteFlagCheck;
/**
* check initialization flag
**/
function initFlagCheck(flags) {
    var flagarray = unpackFlags(flags);
    return flagarray[4] === 1;
}
exports.initFlagCheck = initFlagCheck;
/**
* check busy flag
**/
function busyFlagCheck(flags) {
    var flagarray = unpackFlags(flags);
    return flagarray[9] === 1;
}
exports.busyFlagCheck = busyFlagCheck;
/**
* check flipflop flag
**/
function flipflopFlagCheck(flags) {
    var flagarray = unpackFlags(flags);
    return flagarray[8] === 1;
}
exports.flipflopFlagCheck = flipflopFlagCheck;
/**
* create keyhash
**/
function newKeyhash() {
    var newkey = new web3_js_1.Keypair();
    var keyhash = crypto.SHA256(newkey.publicKey.toString());
    keyhash = bs58.encode(Buffer.from(keyhash.toString(), 'hex'));
    keyhash = new web3_js_1.PublicKey(keyhash);
    return [newkey.publicKey, keyhash];
}
exports.newKeyhash = newKeyhash;
/**
* general link transaction
**/
function linkTX(pdaMAIN, pdaPIECE, pdaREF, ixDATA) {
    // setup transaction
    return new web3_js_1.Transaction().add(new web3_js_1.TransactionInstruction({
        keys: [
            { pubkey: exports.operatorKEY.publicKey, isSigner: true, isWritable: true },
            { pubkey: pdaMAIN, isSigner: false, isWritable: true },
            { pubkey: pdaPIECE, isSigner: false, isWritable: true },
            { pubkey: pdaREF, isSigner: false, isWritable: true },
            { pubkey: web3_js_1.SystemProgram.programId, isSigner: false, isWritable: false },
        ],
        data: Buffer.from(new Uint8Array(ixDATA)),
        programId: exports.fracpayID
    }));
}
exports.linkTX = linkTX;
/**
* general init transaction
**/
function initTX(pdaMAIN, pdaPIECE, pdaREF, pdaselfREF, invitarget, ixDATA) {
    // setup transaction
    return new web3_js_1.Transaction().add(new web3_js_1.TransactionInstruction({
        keys: [
            { pubkey: exports.operatorKEY.publicKey, isSigner: true, isWritable: true },
            { pubkey: invitarget, isSigner: false, isWritable: true },
            { pubkey: pdaMAIN, isSigner: false, isWritable: true },
            { pubkey: pdaPIECE, isSigner: false, isWritable: true },
            { pubkey: pdaREF, isSigner: false, isWritable: true },
            { pubkey: pdaselfREF, isSigner: false, isWritable: true },
            { pubkey: web3_js_1.SystemProgram.programId, isSigner: false, isWritable: false },
        ],
        data: Buffer.from(new Uint8Array(ixDATA)),
        programId: exports.fracpayID
    }));
}
exports.initTX = initTX;
/**
* pay transaction
**/
function payTX(pdaselfTARGET, pdaTARGET, pdaPIECE, pdaselfREF, pdaREF, ixDATA) {
    // raise compute budget for pda derivation max
    var data = Buffer.from(Uint8Array.of.apply(Uint8Array, __spreadArray([0], new BN(650000).toArray("le", 4), false)));
    var additionalComputeBudgetInstruction = new web3_js_1.TransactionInstruction({
        keys: [],
        programId: new web3_js_1.PublicKey("ComputeBudget111111111111111111111111111111"),
        data: data
    });
    // setup transaction
    return new web3_js_1.Transaction().add(additionalComputeBudgetInstruction)
        .add(new web3_js_1.TransactionInstruction({
        keys: [
            { pubkey: exports.operatorKEY.publicKey, isSigner: true, isWritable: true },
            { pubkey: web3_js_1.SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },
            { pubkey: pdaselfTARGET, isSigner: false, isWritable: true },
            { pubkey: pdaTARGET, isSigner: false, isWritable: true },
            { pubkey: pdaPIECE, isSigner: false, isWritable: true },
            { pubkey: pdaselfREF, isSigner: false, isWritable: true },
            { pubkey: pdaREF, isSigner: false, isWritable: true },
            { pubkey: web3_js_1.SystemProgram.programId, isSigner: false, isWritable: false },
        ],
        data: Buffer.from(new Uint8Array(ixDATA)),
        programId: exports.fracpayID
    }));
}
exports.payTX = payTX;
/**
* general create transaction
**/
function createTX(pdaMAIN, pdaPIECE, pdaREF, extra, ixDATA) {
    // setup transaction
    return new web3_js_1.Transaction().add(new web3_js_1.TransactionInstruction({
        keys: [
            { pubkey: exports.operatorKEY.publicKey, isSigner: true, isWritable: true },
            { pubkey: web3_js_1.SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },
            { pubkey: pdaMAIN, isSigner: false, isWritable: true },
            { pubkey: pdaPIECE, isSigner: false, isWritable: true },
            { pubkey: pdaREF, isSigner: false, isWritable: true },
            { pubkey: extra, isSigner: false, isWritable: true },
            { pubkey: web3_js_1.SystemProgram.programId, isSigner: false, isWritable: false },
        ],
        data: Buffer.from(new Uint8Array(ixDATA)),
        programId: exports.fracpayID
    }));
}
exports.createTX = createTX;
/**
* print verbose REF list, no flags
**/
function verboseREFlist(pdaPIECE, count) {
    return __awaiter(this, void 0, void 0, function () {
        var countREF, pdaREFseed, _a, pdaREF, bumpREF, REF, flags, index, index, index, index, index, index, index, index;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    countREF = new Uint16Array(1);
                    countREF[0] = 0;
                    pdaREFseed = createSeed(pdaPIECE, countREF);
                    return [4 /*yield*/, deriveAddress(pdaREFseed)];
                case 1:
                    _a = _c.sent(), pdaREF = _a[0], bumpREF = _a[1];
                    return [4 /*yield*/, getREFdata(pdaREF)];
                case 2:
                    REF = _c.sent();
                    flags = unpackFlags(REF.flags);
                    // print self PIECE data
                    console.log("\t. 0\t| SELF: --------> ".concat(REF.refslug));
                    console.log("\t\t| ADDRESS: -----> ".concat(pdaREF.toBase58()));
                    console.log("\t\t| TARGET: ------> ".concat(REF.target.toBase58()));
                    console.log("\t\t| FRACTION: ----> ".concat(REF.fract));
                    console.log("\t\t| NETSUM: ------> ".concat(REF.netsum));
                    process.stdout.write("\t\t| FLAGS: -------> ");
                    process.stdout.write("[ ");
                    for (index = 0; index < 4; index++) {
                        process.stdout.write("".concat(flags[index], " "));
                    }
                    process.stdout.write("| ");
                    for (index = 4; index < 8; index++) {
                        process.stdout.write("".concat(flags[index], " "));
                    }
                    process.stdout.write("| ");
                    for (index = 8; index < 12; index++) {
                        process.stdout.write("".concat(flags[index], " "));
                    }
                    process.stdout.write("| ");
                    for (index = 12; index < 16; index++) {
                        process.stdout.write("".concat(flags[index], " "));
                    }
                    process.stdout.write("]");
                    process.stdout.write("\n\n");
                    countREF[0] = 1;
                    _c.label = 3;
                case 3:
                    if (!(countREF[0] <= count)) return [3 /*break*/, 7];
                    // find PIECE address
                    pdaREFseed = createSeed(pdaPIECE, countREF);
                    return [4 /*yield*/, deriveAddress(pdaREFseed)];
                case 4:
                    _b = _c.sent(), pdaREF = _b[0], bumpREF = _b[1];
                    return [4 /*yield*/, getREFdata(pdaREF)];
                case 5:
                    // get PIECE data
                    REF = _c.sent();
                    // get flags
                    flags = unpackFlags(REF.flags);
                    // print PIECE data
                    console.log("\t. ".concat(countREF[0], "\t| REF ID: ------> ").concat(REF.refslug));
                    console.log("\t\t| ADDRESS: -----> ".concat(pdaREF.toBase58()));
                    console.log("\t\t| TARGET: ------> ".concat(REF.target.toBase58()));
                    console.log("\t\t| FRACTION: ----> ".concat(REF.fract));
                    console.log("\t\t| NETSUM: ------> ".concat(REF.netsum));
                    process.stdout.write("\t\t| FLAGS: -------> ");
                    process.stdout.write("[ ");
                    for (index = 0; index < 4; index++) {
                        process.stdout.write("".concat(flags[index], " "));
                    }
                    process.stdout.write("| ");
                    for (index = 4; index < 8; index++) {
                        process.stdout.write("".concat(flags[index], " "));
                    }
                    process.stdout.write("| ");
                    for (index = 8; index < 12; index++) {
                        process.stdout.write("".concat(flags[index], " "));
                    }
                    process.stdout.write("| ");
                    for (index = 12; index < 16; index++) {
                        process.stdout.write("".concat(flags[index], " "));
                    }
                    process.stdout.write("]");
                    process.stdout.write("\n\n");
                    _c.label = 6;
                case 6:
                    countREF[0]++;
                    return [3 /*break*/, 3];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.verboseREFlist = verboseREFlist;
/**
* print REF list
**/
function printREFlist(pdaPIECE, count) {
    return __awaiter(this, void 0, void 0, function () {
        var countREF, pdaREFseed, _a, pdaREF, bumpREF, REF;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    countREF = new Uint16Array(1);
                    countREF[0] = 0;
                    pdaREFseed = createSeed(pdaPIECE, countREF);
                    return [4 /*yield*/, deriveAddress(pdaREFseed)];
                case 1:
                    _a = _c.sent(), pdaREF = _a[0], bumpREF = _a[1];
                    return [4 /*yield*/, getREFdata(pdaREF)];
                case 2:
                    REF = _c.sent();
                    // print self PIECE data
                    console.log("\t. 0\tSELF:\t".concat(REF.refslug));
                    countREF[0] = 1;
                    _c.label = 3;
                case 3:
                    if (!(countREF[0] <= count)) return [3 /*break*/, 7];
                    // find PIECE address
                    pdaREFseed = createSeed(pdaPIECE, countREF);
                    return [4 /*yield*/, deriveAddress(pdaREFseed)];
                case 4:
                    _b = _c.sent(), pdaREF = _b[0], bumpREF = _b[1];
                    return [4 /*yield*/, getREFdata(pdaREF)];
                case 5:
                    // get PIECE data
                    REF = _c.sent();
                    // print PIECE data
                    console.log("\t. ".concat(countREF[0], "\tREF ID:\t").concat(REF.refslug));
                    _c.label = 6;
                case 6:
                    countREF[0]++;
                    return [3 /*break*/, 3];
                case 7:
                    console.log("");
                    return [2 /*return*/];
            }
        });
    });
}
exports.printREFlist = printREFlist;
/**
* get PIECE list
**/
function printPIECElist(pdaMAIN, count) {
    return __awaiter(this, void 0, void 0, function () {
        var countPIECE, pdaPIECEseed, _a, pdaPIECE, bumpPIECE, PIECE;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    countPIECE = new Uint16Array(1);
                    countPIECE[0] = 0;
                    pdaPIECEseed = createSeed(pdaMAIN, countPIECE);
                    return [4 /*yield*/, deriveAddress(pdaPIECEseed)];
                case 1:
                    _a = _c.sent(), pdaPIECE = _a[0], bumpPIECE = _a[1];
                    return [4 /*yield*/, getPIECEdata(pdaPIECE)];
                case 2:
                    PIECE = _c.sent();
                    // print self PIECE data
                    console.log("# 0\tOPERATOR:\t".concat(PIECE.pieceslug));
                    countPIECE[0] = 1;
                    _c.label = 3;
                case 3:
                    if (!(countPIECE[0] <= count)) return [3 /*break*/, 7];
                    // find PIECE address
                    pdaPIECEseed = createSeed(pdaMAIN, countPIECE);
                    return [4 /*yield*/, deriveAddress(pdaPIECEseed)];
                case 4:
                    _b = _c.sent(), pdaPIECE = _b[0], bumpPIECE = _b[1];
                    return [4 /*yield*/, getPIECEdata(pdaPIECE)];
                case 5:
                    // get PIECE data
                    PIECE = _c.sent();
                    // print PIECE data
                    console.log("# ".concat(countPIECE[0], "\tPIECE ID:\t").concat(PIECE.pieceslug));
                    _c.label = 6;
                case 6:
                    countPIECE[0]++;
                    return [3 /*break*/, 3];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.printPIECElist = printPIECElist;
/**
* get MAIN account data
**/
function getMAINdata(pdaMAIN) {
    return __awaiter(this, void 0, void 0, function () {
        var MAINaccount, encodedMAINstate, decodedMAINstate;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.connection.getAccountInfo(pdaMAIN)];
                case 1:
                    MAINaccount = _a.sent();
                    if (MAINaccount === null || MAINaccount.data.length === 0) {
                        console.log("! MAIN account for this operator ID has not been created.");
                        process.exit(1);
                    }
                    encodedMAINstate = MAINaccount.data;
                    decodedMAINstate = exports.MAIN_DATA_LAYOUT.decode(encodedMAINstate);
                    return [2 /*return*/, {
                            flags: decodedMAINstate.flags,
                            operator: new web3_js_1.PublicKey(decodedMAINstate.operator),
                            balance: new BigNumber("0x" + decodedMAINstate.balance.toString("hex")),
                            netsum: new BigNumber("0x" + decodedMAINstate.netsum.toString("hex")),
                            piececount: decodedMAINstate.piececount
                        }];
            }
        });
    });
}
exports.getMAINdata = getMAINdata;
/**
* get PIECE account data
**/
function getPIECEdata(pdaPIECE) {
    return __awaiter(this, void 0, void 0, function () {
        var PIECEaccount, encodedPIECEstate, decodedPIECEstate;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.connection.getAccountInfo(pdaPIECE)];
                case 1:
                    PIECEaccount = _a.sent();
                    if (PIECEaccount === null || PIECEaccount.data.length === 0) {
                        console.log("! This PIECE account has not been created.");
                        process.exit(1);
                    }
                    encodedPIECEstate = PIECEaccount.data;
                    decodedPIECEstate = exports.PIECE_DATA_LAYOUT.decode(encodedPIECEstate);
                    return [2 /*return*/, {
                            flags: decodedPIECEstate.flags,
                            operator: new web3_js_1.PublicKey(decodedPIECEstate.operator),
                            balance: new BigNumber("0x" + decodedPIECEstate.balance.toString("hex")),
                            netsum: new BigNumber("0x" + decodedPIECEstate.netsum.toString("hex")),
                            left: new BigNumber("0x" + decodedPIECEstate.left.toString("hex")),
                            refcount: decodedPIECEstate.refcount,
                            pieceslug: decodedPIECEstate.pieceslug.toString()
                        }];
            }
        });
    });
}
exports.getPIECEdata = getPIECEdata;
/**
* get REF account data
**/
function getREFdata(pdaREF) {
    return __awaiter(this, void 0, void 0, function () {
        var REFaccount, encodedREFstate, decodedREFstate;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.connection.getAccountInfo(pdaREF)];
                case 1:
                    REFaccount = _a.sent();
                    if (REFaccount === null || REFaccount.data.length === 0) {
                        console.log("! This REF account has not been created.");
                        process.exit(1);
                    }
                    encodedREFstate = REFaccount.data;
                    decodedREFstate = exports.REF_DATA_LAYOUT.decode(encodedREFstate);
                    return [2 /*return*/, {
                            flags: decodedREFstate.flags,
                            target: new web3_js_1.PublicKey(decodedREFstate.target),
                            fract: decodedREFstate.fract,
                            netsum: new BigNumber("0x" + decodedREFstate.netsum.toString("hex")),
                            refslug: decodedREFstate.refslug.toString()
                        }];
            }
        });
    });
}
exports.getREFdata = getREFdata;
/**
* unpack flags
**/
function unpackFlags(flags) {
    var highflags = flags >> 8;
    var lowflags = flags & 0xFF;
    var bitarray = new Uint8Array(16);
    for (var index = 0; index < 8; index++) {
        bitarray[index] = (highflags >> (7 - index)) & 0x01;
    }
    for (index = 0; index < 8; index++) {
        bitarray[8 + index] = (lowflags >> (7 - index)) & 0x01;
    }
    return bitarray;
}
exports.unpackFlags = unpackFlags;
/**
* create pda seed
**/
function createSeed(pda, count) {
    var countLow = count[0] & 0xFF; // mask for low order count byte
    var countHigh = (count[0] >> 8) & 0xFF; // shift and mask for high order count byte
    return toUTF8Array(pda
        .toString()
        .slice(0, exports.PUBKEY_SIZE - exports.COUNT_SIZE))
        .concat(countHigh, countLow);
}
exports.createSeed = createSeed;
/**
* u32 to bytes
**/
function u32toBytes(number) {
    var byte1 = number[0] & 0xFF; // mask for lowest order number byte
    var byte2 = (number[0] >> 8) & 0xFF; // shift and mask for next lowest order number byte
    var byte3 = (number[0] >> 16) & 0xFF; // shift and mask for high order number byte
    var byte4 = (number[0] >> 24) & 0xFF; // shift and mask for highest order number byte
    return [byte4, byte3, byte2, byte1];
}
exports.u32toBytes = u32toBytes;
/**
* derive pda
**/
function deriveAddress(seed) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, web3_js_1.PublicKey.findProgramAddress([new Uint8Array(seed)], exports.fracpayID)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.deriveAddress = deriveAddress;
/**
* find invitation hash
**/
function findHash(inviteHASH) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.connection.getParsedProgramAccounts(exports.fracpayID, {
                        filters: [
                            {
                                dataSize: exports.REF_SIZE
                            },
                            {
                                memcmp: {
                                    offset: exports.FLAGS_SIZE,
                                    bytes: inviteHASH
                                }
                            },
                        ]
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.findHash = findHash;
/**
* check to make sure operator ID isn't already taken
**/
function availableIDcheck(operatorID) {
    return __awaiter(this, void 0, void 0, function () {
        var operatorIDaccount;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.connection.getParsedProgramAccounts(exports.fracpayID, {
                        filters: [
                            {
                                dataSize: exports.PIECE_SIZE
                            },
                            {
                                memcmp: {
                                    offset: exports.PIECE_SIZE - exports.PIECESLUG_SIZE,
                                    bytes: bs58.encode(toUTF8Array(operatorID))
                                }
                            },
                        ]
                    })];
                case 1:
                    operatorIDaccount = _a.sent();
                    if (!lodash.isEqual(operatorIDaccount, [])) {
                        console.log("! The operator ID '".concat(operatorID, "' already has a MAIN account associated with it.\n"), " Choose a different ID for your operator MAIN account.");
                        process.exit(1);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.availableIDcheck = availableIDcheck;
/**
* get all PIECEs with specific MAIN operator account
***/
function getPIECEs(operator) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("chirp");
                    return [4 /*yield*/, exports.connection.getParsedProgramAccounts(exports.fracpayID, {
                            filters: [
                                {
                                    dataSize: exports.PIECE_SIZE
                                },
                                {
                                    memcmp: {
                                        offset: exports.FLAGS_SIZE,
                                        bytes: operator.toString()
                                    }
                                },
                            ]
                        })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getPIECEs = getPIECEs;
/**
* Check if the hello world BPF program has been deployed
**/
function checkProgram() {
    return __awaiter(this, void 0, void 0, function () {
        var programKeypair, err_1, errMsg;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, createKeypairFromFile(exports.PROGRAM_KEYPAIR_PATH)];
                case 1:
                    programKeypair = _a.sent();
                    exports.fracpayID = programKeypair.publicKey;
                    console.log(". Fracpay found at:\t".concat(exports.fracpayID.toBase58()));
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    errMsg = err_1.message;
                    throw new Error("! Failed to read program keypair at \"".concat(exports.PROGRAM_KEYPAIR_PATH, "\" due to error: ").concat(errMsg, ".\n\n\t\t\tProgram may need to be deployed with \n\t\t\t`solana program deploy fracpay_server/target/deploy/fracpay_server.so`"));
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.checkProgram = checkProgram;
/**
 * establish connection
 **/
function establishConnection() {
    return __awaiter(this, void 0, void 0, function () {
        var rpcUrl, version;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getRpcUrl()];
                case 1:
                    rpcUrl = _a.sent();
                    exports.connection = new web3_js_1.Connection(rpcUrl, "confirmed");
                    return [4 /*yield*/, exports.connection.getVersion()];
                case 2:
                    version = _a.sent();
                    console.log(". Connection to cluster established:", rpcUrl, version);
                    return [2 /*return*/];
            }
        });
    });
}
exports.establishConnection = establishConnection;
function getRpcUrl() {
    return __awaiter(this, void 0, void 0, function () {
        var config, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, getConfig()];
                case 1:
                    config = _a.sent();
                    if (!config.json_rpc_url)
                        throw new Error("Missing RPC URL");
                    return [2 /*return*/, config.json_rpc_url];
                case 2:
                    err_2 = _a.sent();
                    console.warn("! Failed to read RPC url from CLI config file, falling back to localhost");
                    return [2 /*return*/, "http://localhost:8899"];
                case 3: return [2 /*return*/];
            }
        });
    });
}
/**
 * get operator's local solana config
 **/
function getConfig() {
    return __awaiter(this, void 0, void 0, function () {
        var CONFIG_FILE_PATH, configYml;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    CONFIG_FILE_PATH = path.resolve(os.homedir(), ".config", "solana", "cli", "config.yml");
                    return [4 /*yield*/, fs.readFile(CONFIG_FILE_PATH, { encoding: "utf8" })];
                case 1:
                    configYml = _a.sent();
                    return [2 /*return*/, yaml.parse(configYml)];
            }
        });
    });
}
/**
 * establish operator
 **/
function establishOperator() {
    return __awaiter(this, void 0, void 0, function () {
        var fees, feeCalculator, _a, lamports;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    fees = 0;
                    if (!!exports.operatorKEY) return [3 /*break*/, 4];
                    return [4 /*yield*/, exports.connection.getRecentBlockhash()];
                case 1:
                    feeCalculator = (_b.sent()).feeCalculator;
                    // Calculate the cost to fund the greeter account
                    _a = fees;
                    return [4 /*yield*/, exports.connection.getMinimumBalanceForRentExemption(exports.MAIN_SIZE + exports.PIECE_SIZE + exports.REF_SIZE)];
                case 2:
                    // Calculate the cost to fund the greeter account
                    fees = _a + _b.sent();
                    // Calculate the cost of sending transactions
                    fees += feeCalculator.lamportsPerSignature * 100; // wag
                    return [4 /*yield*/, getOperator()];
                case 3:
                    exports.operatorKEY = _b.sent();
                    _b.label = 4;
                case 4: return [4 /*yield*/, exports.connection.getBalance(exports.operatorKEY.publicKey)];
                case 5:
                    lamports = _b.sent();
                    if (lamports < fees) {
                        // If current balance is not enough to pay for fees, request an airdrop
                        console.log("! Unfortunately you do not have enough SOL to initialize an account.\n", "  You need ".concat(fees / web3_js_1.LAMPORTS_PER_SOL, " SOL to initialize account."));
                    }
                    console.log(". Operator account is:\t", exports.operatorKEY.publicKey.toBase58(), "containing", lamports / web3_js_1.LAMPORTS_PER_SOL, "SOL to pay for fees");
                    return [2 /*return*/];
            }
        });
    });
}
exports.establishOperator = establishOperator;
/**
 * setup operatorKEY as Keypair
 **/
function getOperator() {
    return __awaiter(this, void 0, void 0, function () {
        var config, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, getConfig()];
                case 1:
                    config = _a.sent();
                    if (!config.keypair_path)
                        throw new Error("Missing keypair path");
                    return [4 /*yield*/, createKeypairFromFile(config.keypair_path)];
                case 2: return [2 /*return*/, _a.sent()];
                case 3:
                    err_3 = _a.sent();
                    console.warn("! Failed to create keypair from CLI config file, falling back to new random keypair");
                    return [2 /*return*/, web3_js_1.Keypair.generate()];
                case 4: return [2 /*return*/];
            }
        });
    });
}
/**
 * read secret key from file and return Keypair object
 **/
function createKeypairFromFile(filePath) {
    return __awaiter(this, void 0, void 0, function () {
        var secretKeyString, secretKey;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fs.readFile(filePath, { encoding: "utf8" })];
                case 1:
                    secretKeyString = _a.sent();
                    secretKey = Uint8Array.from(JSON.parse(secretKeyString));
                    return [2 /*return*/, web3_js_1.Keypair.fromSecretKey(secretKey)];
            }
        });
    });
}
/**
 * return private key from 64 byte array in file
 **/
var getPrivateKey = function (name) {
    return Uint8Array.from(JSON.parse(fs.readFileSync("./keys/".concat(name, "_pri.json"))));
};
/**
 * return public key from base58 formatted string in file
 **/
var getPublicKey = function (name) {
    return new web3_js_1.PublicKey(JSON.parse(fs.readFileSync("./keys/".concat(name, "_pub.json"))));
};
/**
 * write a public key to file [presumably hex string, haven't checked yet]
 **/
var writePublicKey = function (publicKey, name) {
    fs.writeFileSync("./keys/".concat(name, "_pub.json"), JSON.stringify(publicKey.toString()));
};
/**
 * creates Keypair object from named pubkey prikey json files
 **/
var getKeypair = function (name) {
    return new web3_js_1.Keypair({
        publicKey: new Uint8Array(getPublicKey(name).toBytes()),
        secretKey: getPrivateKey(name)
    });
};
exports.getKeypair = getKeypair;
/**
 * read fracpay program ID from json file in keys directory
 **/
var getProgramID = function () {
    try {
        return getPublicKey("fracpay");
    }
    catch (error) {
        console.log("Given programId is missing or incorrect");
        process.exit(1);
    }
};
exports.getProgramID = getProgramID;
/**
 * take in a UTF8 array and turn it into a string
 **/
function fromUTF8Array(data) {
    var str = "";
    var i;
    for (i = 0; i < data.length; i++) {
        var value = data[i];
        if (value < 0x80) {
            str += String.fromCharCode(value);
        }
        else if (value > 0xBF && value < 0xE0) {
            str += String.fromCharCode((value & 0x1F) << 6 | data[i + 1] & 0x3F);
            i += 1;
        }
        else if (value > 0xDF && value < 0xF0) {
            str += String.fromCharCode((value & 0x0F) << 12 | (data[i + 1] & 0x3F) << 6 | data[i + 2] & 0x3F);
            i += 2;
        }
        else {
            // surrogate pair
            var charCode = ((value & 0x07) << 18 |
                (data[i + 1] & 0x3F) << 12 |
                (data[i + 2] & 0x3F) << 6 |
                data[i + 3] & 0x3F) - 0x010000;
            str += String.fromCharCode(charCode >> 10 | 0xD800, charCode & 0x03FF | 0xDC00);
            i += 3;
        }
    }
    return str;
}
exports.fromUTF8Array = fromUTF8Array;
/**
 * take in a string and turn it into a UTF8 byte array
 **/
function toUTF8Array(str) {
    var utf8 = [];
    for (var i = 0; i < str.length; i++) {
        var charcode = str.charCodeAt(i);
        if (charcode < 0x80)
            utf8.push(charcode);
        else if (charcode < 0x800) {
            utf8.push(0xc0 | (charcode >> 6), 0x80 | (charcode & 0x3f));
        }
        else if (charcode < 0xd800 || charcode >= 0xe000) {
            utf8.push(0xe0 | (charcode >> 12), 0x80 | ((charcode >> 6) & 0x3f), 0x80 | (charcode & 0x3f));
        }
        // surrogate pair
        else {
            i++;
            charcode = ((charcode & 0x3ff) << 10) | (str.charCodeAt(i) & 0x3ff);
            utf8.push(0xf0 | (charcode >> 18), 0x80 | ((charcode >> 12) & 0x3f), 0x80 | ((charcode >> 6) & 0x3f), 0x80 | (charcode & 0x3f));
        }
    }
    return utf8;
}
exports.toUTF8Array = toUTF8Array;
/****************************************************************
 * setup layouts and interfaces					*
 ****************************************************************/
/**
 * flags layout
 **/
var flags = function (property) {
    if (property === void 0) { property = "flags"; }
    return BufferLayout.blob(2, property);
};
/**
 * public key layout
 **/
var publicKey = function (property) {
    if (property === void 0) { property = "publicKey"; }
    return BufferLayout.blob(32, property);
};
/**
 * pieceID layout
 **/
var pieceSlug = function (property) {
    if (property === void 0) { property = "pieceSlug"; }
    return BufferLayout.blob(67, property);
}; // 63B String with 4B Vec tag
/**
 * refSlug layout
 **/
var refSlug = function (property) {
    if (property === void 0) { property = "refSlug"; }
    return BufferLayout.blob(20, property);
}; // 16B String with 4B Vec tag
/**
 * u64 layout
 **/
var uint64 = function (property) {
    if (property === void 0) { property = "uint64"; }
    return BufferLayout.blob(8, property);
};
/**
 * account struct MAIN
 **/
exports.MAIN_DATA_LAYOUT = BufferLayout.struct([
    BufferLayout.u16("flags"),
    publicKey("operator"),
    uint64("balance"),
    uint64("netsum"),
    BufferLayout.u16("piececount"),
]);
/**
 * account struct PIECE
 **/
exports.PIECE_DATA_LAYOUT = BufferLayout.struct([
    BufferLayout.u16("flags"),
    publicKey("operator"),
    uint64("balance"),
    uint64("netsum"),
    uint64("left"),
    BufferLayout.u16("refcount"),
    pieceSlug("pieceslug"),
]);
/**
 * account struct REF
 **/
exports.REF_DATA_LAYOUT = BufferLayout.struct([
    BufferLayout.u16("flags"),
    publicKey("target"),
    BufferLayout.u32("fract"),
    uint64("netsum"),
    refSlug("refslug"),
]);
