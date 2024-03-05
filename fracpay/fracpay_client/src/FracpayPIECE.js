"use strict";
/****************************************************************
 * Fracpay client FracpayPIECE
 * blairmunroakusa@.0322.anch.AK:
 *
 * . issue fractal payment to a PIECE
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
var FracpayPIECE = function () { return __awaiter(void 0, void 0, void 0, function () {
    var operatorID, _a, pdaMAIN, bumpMAIN, MAIN, pdaPIECE, PIECE, payment, pdaREFs, pdaREFseeds, bumpREFs, countREF, pdaREFseed, _b, pdaREF, bumpREF, REFs, ffPIECE, ffselfREF, _c, _d, ixDATA, payTXs, txno, txno, _e, _f, txno, _g;
    return __generator(this, function (_h) {
        switch (_h.label) {
            case 0:
                _h.trys.push([0, 20, , 21]);
                //get started
                // setup
                console.log("");
                return [4 /*yield*/, (0, utils_1.establishConnection)()];
            case 1:
                _h.sent();
                return [4 /*yield*/, (0, utils_1.establishOperator)()];
            case 2:
                _h.sent();
                return [4 /*yield*/, (0, utils_1.checkProgram)()];
            case 3:
                _h.sent();
                // get operator ID
                console.log("");
                operatorID = prompt("Please enter the operator ID: ");
                return [4 /*yield*/, (0, utils_1.deriveAddress)((0, utils_1.toUTF8Array)(operatorID))];
            case 4:
                _a = _h.sent(), pdaMAIN = _a[0], bumpMAIN = _a[1];
                console.log("\n. Operator MAIN pda:\t".concat(pdaMAIN.toBase58(), " found after ").concat(256 - bumpMAIN, " tries"));
                return [4 /*yield*/, (0, utils_1.getMAINdata)(pdaMAIN)];
            case 5:
                MAIN = _h.sent();
                // get PIECE account
                console.log("");
                pdaPIECE = prompt("Please paste the PIECE account: ");
                // get PIECE data
                pdaPIECE = new web3_js_1.PublicKey(pdaPIECE);
                return [4 /*yield*/, (0, utils_1.getPIECEdata)(pdaPIECE)];
            case 6:
                PIECE = _h.sent();
                payment = new BigUint64Array();
                pdaREFs = new Array();
                pdaREFseeds = new Array();
                bumpREFs = new Array();
                countREF = new Uint16Array(1);
                countREF[0] = 0;
                countREF[0];
                _h.label = 7;
            case 7:
                if (!(countREF[0] <= PIECE.refcount)) return [3 /*break*/, 10];
                pdaREFseed = (0, utils_1.createSeed)(pdaPIECE, countREF);
                return [4 /*yield*/, (0, utils_1.deriveAddress)(pdaREFseed)];
            case 8:
                _b = _h.sent(), pdaREF = _b[0], bumpREF = _b[1];
                pdaREFs.push(pdaREF);
                pdaREFseeds.push(pdaREFseed);
                bumpREFs.push(bumpREF);
                _h.label = 9;
            case 9:
                countREF[0]++;
                return [3 /*break*/, 7];
            case 10:
                REFs = new Array();
                ffPIECE = false;
                ffselfREF = false;
                countREF[0] = 0;
                _h.label = 11;
            case 11:
                if (!(countREF[0] <= PIECE.refcount)) return [3 /*break*/, 14];
                _d = (_c = REFs).push;
                return [4 /*yield*/, (0, utils_1.getREFdata)(pdaREFs[countREF[0]])];
            case 12:
                _d.apply(_c, [_h.sent()]);
                _h.label = 13;
            case 13:
                countREF[0]++;
                return [3 /*break*/, 11];
            case 14:
                ixDATA = [5, bumpREFs[0]].concat(pdaREFseeds[0]);
                console.log(ixDATA);
                payTXs = Array();
                if (!true) return [3 /*break*/, 19];
                // switch to complete payment mode
                console.log("\n! Fracpay is busy processing a payment for this PIECE.");
                console.log("\n! We're going to sit here and try to finish the payment.");
                console.log("\n! For now you eat the cost; we're all in this together.");
                // get ff flags from piece and self-reference
                ffPIECE = (0, utils_1.flipflopFlagCheck)(PIECE.flags);
                ffselfREF = (0, utils_1.flipflopFlagCheck)(REFs[0].flags);
                if (ffPIECE !== ffselfREF) {
                    console.log("Something catastrophic happened. Aborting all.");
                    process.exit(1);
                }
                // generate transactions for all incomplete REF payments
                for (countREF[0] = 1; countREF[0] <= PIECE.refcount; countREF[0]++) {
                    if ((0, utils_1.flipflopFlagCheck)(REFs[countREF[0]].flags) !== ffPIECE) {
                        continue;
                    }
                    ixDATA = [5, bumpREFs[countREF[0]]].concat(pdaREFseeds[countREF[0]]);
                    payTXs.push((0, utils_1.payTX)(REFs[countREF[0]].target, pdaPIECE, pdaREFs[0], pdaREFs[countREF[0]], ixDATA));
                }
                // send batch of transaction in parallel
                for (txno = 0; txno < payTXs.length; txno++) {
                    payTXs[txno] = (0, web3_js_1.sendAndConfirmTransaction)(utils_1.connection, payTXs[txno], [utils_1.operatorKEY]);
                }
                txno = 0;
                _h.label = 15;
            case 15:
                if (!(txno < payTXs.length)) return [3 /*break*/, 18];
                _e = payTXs;
                _f = txno;
                return [4 /*yield*/, payTXs[txno]];
            case 16:
                _e[_f] = _h.sent();
                _h.label = 17;
            case 17:
                txno++;
                return [3 /*break*/, 15];
            case 18:
                // print results
                for (txno = 0; txno < payTXs.length; txno++) {
                    console.log(". Successful Fracpay transaction: ", payTXs[txno]);
                }
                _h.label = 19;
            case 19: return [3 /*break*/, 21];
            case 20:
                _g = _h.sent();
                console.log(Error);
                return [3 /*break*/, 21];
            case 21: return [2 /*return*/];
        }
    });
}); };
FracpayPIECE();
