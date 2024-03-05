"use strict";
/****************************************************************
 * Fracpay client CreateREF					*
 * blairmunroakusa@.0322.anch.AK				*
 *								*
 * CreateREF creates a new reference.				*
 * One uninitialized REF account is created.			*
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
 * imports							*
 ****************************************************************/
// misc packages
var prompt = require("prompt-sync")({ sigint: true });
var lodash = require("lodash");
// misc solana
var web3_js_1 = require("@solana/web3.js");
// utility functions
var utils_1 = require("./utils");
// utility constants
var utils_2 = require("./utils");
/****************************************************************
 * main								*
 ****************************************************************/
var CreateREF = function () { return __awaiter(void 0, void 0, void 0, function () {
    var operatorID, _a, pdaMAIN, bumpMAIN, MAIN, selectPIECE, pdaPIECEseed, _b, pdaPIECE, bumpPIECE, PIECE, REFslug, countREF, pdaREFseed, _c, pdaREF, bumpREF, ixDATA, CreateREFtx, _d, _e, _f, _g;
    return __generator(this, function (_h) {
        switch (_h.label) {
            case 0:
                _h.trys.push([0, 11, , 12]);
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
                operatorID = prompt("Please enter your operator ID: ");
                return [4 /*yield*/, (0, utils_1.deriveAddress)((0, utils_1.toUTF8Array)(operatorID))];
            case 4:
                _a = _h.sent(), pdaMAIN = _a[0], bumpMAIN = _a[1];
                console.log(". Operator MAIN pda:\t".concat(pdaMAIN.toBase58(), " found after ").concat(256 - bumpMAIN, " tries"));
                return [4 /*yield*/, (0, utils_1.getMAINdata)(pdaMAIN)];
            case 5:
                MAIN = _h.sent();
                // check to make sure operator has right account
                if (!lodash.isEqual(utils_2.operatorKEY.publicKey, MAIN.operator)) {
                    console.log("! You don't have the right wallet to add pieces to this account.", " Check to see if you have the right Operator ID, or wallet pubkey.");
                    process.exit(1);
                }
                // state intention
                console.log(". \nThere are ".concat(MAIN.piececount, " pieces associated with '").concat(operatorID, "' MAIN account.\n"));
                // print PIECE list
                return [4 /*yield*/, (0, utils_1.printPIECElist)(pdaMAIN, MAIN.piececount)];
            case 6:
                // print PIECE list
                _h.sent();
                selectPIECE = new Uint16Array(1);
                selectPIECE[0] = parseInt(prompt("From the PIECE list, please enter # or SELF to add REF to: "));
                // check PIECE selection input
                if (selectPIECE[0] < 0 || selectPIECE[0] > MAIN.piececount) {
                    console.log("! You made an invalid selection. Type in a number, nothing else.");
                    process.exit(1);
                }
                pdaPIECEseed = (0, utils_1.createSeed)(pdaMAIN, selectPIECE);
                return [4 /*yield*/, (0, utils_1.deriveAddress)(pdaPIECEseed)];
            case 7:
                _b = _h.sent(), pdaPIECE = _b[0], bumpPIECE = _b[1];
                return [4 /*yield*/, (0, utils_1.getPIECEdata)(pdaPIECE)];
            case 8:
                PIECE = _h.sent();
                REFslug = prompt("Please enter name for your reference under 20 Bytes (ie under 20 standard characters): ");
                // check to make sure slug is under limit
                if ((0, utils_1.toUTF8Array)(REFslug).length > utils_2.REFSLUG_SIZE) {
                    console.log("! Memory limitations require REF IDs shorter than 20 Bytes (ie 20 standard characters).\n", " You chose an ID that exceeds this limit. Please try a new ID.");
                    process.exit(1);
                }
                // check to make sure operator is authorized to add ref
                if (!lodash.isEqual(utils_2.operatorKEY.publicKey, PIECE.operator)) {
                    console.log("! You don't have the right wallet to add refs to this particular piece.\n", " Check to see if you have the right Operator ID, or wallet pubkey.");
                    process.exit(1);
                }
                countREF = new Uint16Array(1);
                countREF[0] = PIECE.refcount + 1;
                console.log(". This will be REF number ".concat(countREF[0], "."));
                pdaREFseed = (0, utils_1.createSeed)(pdaPIECE, countREF);
                return [4 /*yield*/, (0, utils_1.deriveAddress)(pdaREFseed)];
            case 9:
                _c = _h.sent(), pdaREF = _c[0], bumpREF = _c[1];
                console.log(". New REF pda:\t".concat(pdaREF.toBase58(), " found after ").concat(256 - bumpPIECE, " tries"));
                ixDATA = [2, bumpREF]
                    .concat(pdaREFseed)
                    .concat((0, utils_1.toUTF8Array)(REFslug));
                CreateREFtx = (0, utils_1.createTX)(pdaMAIN, pdaPIECE, pdaREF, pdaREF, ixDATA);
                // send transaction
                _e = (_d = console).log;
                _f = "txhash: ".concat;
                return [4 /*yield*/, (0, web3_js_1.sendAndConfirmTransaction)(utils_2.connection, CreateREFtx, [utils_2.operatorKEY])];
            case 10:
                // send transaction
                _e.apply(_d, [_f.apply("txhash: ", [_h.sent()])]);
                // confirmation
                console.log("\n* Successfully created new REF account called '".concat(REFslug, "'"), " for PIECE account '".concat(PIECE.pieceslug, "' owned by operator '").concat(operatorID, "'!\n"));
                return [3 /*break*/, 12];
            case 11:
                _g = _h.sent();
                console.log(Error);
                console.log(Error.prototype.stack);
                return [3 /*break*/, 12];
            case 12: return [2 /*return*/];
        }
    });
}); };
CreateREF();
