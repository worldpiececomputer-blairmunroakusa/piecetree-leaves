"use strict";
/****************************************************************
 * Fracpay client InitPIECE
 * blairmunroakusa@.0322.anch.AK:
 *
 * Lists all accounts under a specific MAIN account.
 * Pieces are listed numbered to make CLI piece selection easy.
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
exports.__esModule = true;
/****************************************************************
 * imports
 ****************************************************************/
var prompt = require("prompt-sync")({ sigint: true });
// misc solana
var web3_js_1 = require("@solana/web3.js");
var crypto = require('crypto-js');
var utils_1 = require("./utils");
/****************************************************************
 * main
 ****************************************************************/
var InitPIECE = function () { return __awaiter(void 0, void 0, void 0, function () {
    var operatorID, _a, pdaMAIN_1, bumpMAIN, MAIN, selectPIECE, pdaPIECEseed, _b, pdaPIECE, bumpPIECE, PIECE, yesno, selectREF, pdaREFseed, _c, pdaREF, bumpREF, invite_1, ixDATA_1, InitPIECEtx, _d, _e, _f, _g;
    return __generator(this, function (_h) {
        switch (_h.label) {
            case 0:
                _h.trys.push([0, 14, , 15]);
                // setup
                return [4 /*yield*/, (0, utils_1.establishConnection)()];
            case 1:
                // setup
                _h.sent();
                return [4 /*yield*/, (0, utils_1.establishOperator)()];
            case 2:
                _h.sent();
                return [4 /*yield*/, (0, utils_1.checkProgram)()];
            case 3:
                _h.sent();
                operatorID = prompt("Please enter the operator ID: ");
                return [4 /*yield*/, (0, utils_1.deriveAddress)((0, utils_1.toUTF8Array)(operatorID))];
            case 4:
                _a = _h.sent(), pdaMAIN_1 = _a[0], bumpMAIN = _a[1];
                console.log(". Operator MAIN pda:\t".concat(pdaMAIN_1.toBase58(), " found after ").concat(256 - bumpMAIN, " tries"));
                return [4 /*yield*/, (0, utils_1.getMAINdata)(pdaMAIN_1)];
            case 5:
                MAIN = _h.sent();
                // print PIECE list
                console.log("\nPieces:\n");
                return [4 /*yield*/, (0, utils_1.printPIECElist)(pdaMAIN_1, MAIN.piececount)];
            case 6:
                _h.sent();
                selectPIECE = new Uint16Array(1);
                console.log("");
                _h.label = 7;
            case 7:
                selectPIECE[0] = parseInt(prompt("From the PIECE list, please enter PIECE # that you wish to initialize: "));
                // check for valid input
                if (0 >= selectPIECE[0] && selectPIECE[0] >= MAIN.piececount) {
                    console.log("You entered an invalid selection.");
                    return [3 /*break*/, 10];
                }
                pdaPIECEseed = (0, utils_1.createSeed)(pdaMAIN_1, selectPIECE);
                return [4 /*yield*/, (0, utils_1.deriveAddress)(pdaPIECEseed)];
            case 8:
                _b = _h.sent(), pdaPIECE = _b[0], bumpPIECE = _b[1];
                return [4 /*yield*/, (0, utils_1.getPIECEdata)(pdaPIECE)];
            case 9:
                PIECE = _h.sent();
                if ((0, utils_1.initFlagCheck)(PIECE.flags)) {
                    yesno = prompt("This PIECE is already initialized. Do you wish to reinititialize? (y/n) ");
                    if (yesno === "y") {
                        return [3 /*break*/, 11];
                    }
                }
                _h.label = 10;
            case 10:
                if ((0, utils_1.initFlagCheck)(PIECE.flags)) return [3 /*break*/, 7];
                _h.label = 11;
            case 11:
                selectREF = new Uint16Array(1);
                selectREF[0] = 0;
                pdaREFseed = (0, utils_1.createSeed)(pdaPIECE, selectREF);
                return [4 /*yield*/, (0, utils_1.deriveAddress)(pdaREFseed)];
            case 12:
                _c = _h.sent(), pdaREF = _c[0], bumpREF = _c[1];
                console.log("\nPlease choose an initialization option:");
                console.log("0 . Direct balance to your MAIN account");
                console.log("1 . Create an invite for someone else to link PIECE");
                console.log("2 . Direct balance to somewhere else\n");
                invite_1 = parseInt(prompt("Enter the number that corresponds to your selection: "));
                ixDATA_1 = [3, invite_1];
                InitPIECEtx = (function () {
                    switch (invite_1) {
                        case 0: {
                            // setup instruction data
                            return (0, utils_1.initTX)(pdaMAIN_1, pdaPIECE, pdaREF, pdaMAIN_1, ixDATA_1);
                        }
                        case 1: {
                            // create invite key
                            var _a = (0, utils_1.newKeyhash)(), inviteKEY = _a[0], hashKEY = _a[1];
                            console.log("\n!!! COPY AND SAVE THIS INVITE KEY !!!");
                            console.log("".concat(PIECE.pieceslug, ".").concat(inviteKEY.toBase58(), "\n"));
                            return (0, utils_1.initTX)(pdaMAIN_1, pdaPIECE, pdaREF, hashKEY, ixDATA_1);
                        }
                        case 2: {
                            // get target account
                            var target = prompt("Please paste the recipient's account address: ");
                            target = new web3_js_1.PublicKey(target);
                            return (0, utils_1.initTX)(pdaMAIN_1, pdaPIECE, pdaREF, target, ixDATA_1);
                        }
                        default:
                            console.log("! Invalid selection");
                            process.exit(1);
                    }
                })();
                // send transaction
                _e = (_d = console).log;
                _f = "txhash: ".concat;
                return [4 /*yield*/, (0, web3_js_1.sendAndConfirmTransaction)(utils_1.connection, InitPIECEtx, [utils_1.operatorKEY])];
            case 13:
                // send transaction
                _e.apply(_d, [_f.apply("txhash: ", [_h.sent()])]);
                // confirmation
                console.log("\n* Successfully initialized PIECE account '".concat(PIECE.pieceslug, "' for operator '").concat(operatorID, "'!\n"));
                return [3 /*break*/, 15];
            case 14:
                _g = _h.sent();
                console.log(Error);
                return [3 /*break*/, 15];
            case 15: return [2 /*return*/];
        }
    });
}); };
InitPIECE();
