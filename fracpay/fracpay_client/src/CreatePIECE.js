"use strict";
/****************************************************************
 * Fracpay client CreatePIECE					*
 * blairmunroakusa@.0322.anch.AK				*
 *								*
 * CreatePIECE creates a new piece.				*
 * One each of PIECE, self REF accounts are created.		*
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
var CreatePIECE = function () { return __awaiter(void 0, void 0, void 0, function () {
    var operatorID, _a, pdaMAIN, bumpMAIN, MAIN, PIECEslug, countPIECE, pdaselfPIECEseed, _b, pdaselfPIECE, bumpselfPIECE, pdaPIECEseed, _c, pdaPIECE, bumpPIECE, countREF, pdaREFseed, _d, pdaREF, bumpREF, ixDATA, CreatePIECEtx, _e, _f, _g, _h;
    return __generator(this, function (_j) {
        switch (_j.label) {
            case 0:
                _j.trys.push([0, 10, , 11]);
                // setup
                return [4 /*yield*/, (0, utils_1.establishConnection)()];
            case 1:
                // setup
                _j.sent();
                return [4 /*yield*/, (0, utils_1.establishOperator)()];
            case 2:
                _j.sent();
                return [4 /*yield*/, (0, utils_1.checkProgram)()];
            case 3:
                _j.sent();
                operatorID = prompt("Please enter your operator ID: ");
                return [4 /*yield*/, (0, utils_1.deriveAddress)((0, utils_1.toUTF8Array)(operatorID))];
            case 4:
                _a = _j.sent(), pdaMAIN = _a[0], bumpMAIN = _a[1];
                console.log(". Operator MAIN pda:\t".concat(pdaMAIN.toBase58(), " found after ").concat(256 - bumpMAIN, " tries"));
                return [4 /*yield*/, (0, utils_1.getMAINdata)(pdaMAIN)];
            case 5:
                MAIN = _j.sent();
                // check to make sure operator has right account
                if (!lodash.isEqual(utils_2.operatorKEY.publicKey, MAIN.operator)) {
                    console.log("! You don't have the right wallet to add pieces to this account.", " Check to see if you have the right Operator ID, or wallet pubkey.");
                    process.exit(1);
                }
                PIECEslug = prompt("Please enter the name for your piece: ");
                // check to make sure slug is right size
                if ((0, utils_1.toUTF8Array)(PIECEslug).length > utils_2.PIECESLUG_SIZE) {
                    console.log("! Memory limitations require piece IDs shorter than 63 Bytes (ie 63 standard characters).\n", " You chose an ID that exceeds this limit. Please try a smaller ID.");
                    process.exit(1);
                }
                countPIECE = new Uint16Array(1);
                countPIECE[0] = 0;
                pdaselfPIECEseed = (0, utils_1.createSeed)(pdaMAIN, countPIECE);
                return [4 /*yield*/, (0, utils_1.deriveAddress)(pdaselfPIECEseed)];
            case 6:
                _b = _j.sent(), pdaselfPIECE = _b[0], bumpselfPIECE = _b[1];
                // set new piece count
                countPIECE[0] = MAIN.piececount + 1;
                console.log(". This will be PIECE number ".concat(countPIECE[0], "."));
                pdaPIECEseed = (0, utils_1.createSeed)(pdaMAIN, countPIECE);
                return [4 /*yield*/, (0, utils_1.deriveAddress)(pdaPIECEseed)];
            case 7:
                _c = _j.sent(), pdaPIECE = _c[0], bumpPIECE = _c[1];
                console.log(". New PIECE pda:\t".concat(pdaPIECE.toBase58(), " found after ").concat(256 - bumpPIECE, " tries"));
                countREF = new Uint16Array(1);
                countREF[0] = 0;
                pdaREFseed = (0, utils_1.createSeed)(pdaPIECE, countREF);
                return [4 /*yield*/, (0, utils_1.deriveAddress)(pdaREFseed)];
            case 8:
                _d = _j.sent(), pdaREF = _d[0], bumpREF = _d[1];
                console.log(". New PIECE self-REF:\t".concat(pdaREF.toBase58(), " found after ").concat(256 - bumpREF, " tries"));
                ixDATA = [1, bumpPIECE, bumpREF]
                    .concat(pdaREFseed)
                    .concat(pdaPIECEseed)
                    .concat((0, utils_1.toUTF8Array)(PIECEslug));
                CreatePIECEtx = (0, utils_1.createTX)(pdaMAIN, pdaPIECE, pdaREF, pdaselfPIECE, ixDATA);
                // send transaction
                _f = (_e = console).log;
                _g = "txhash: ".concat;
                return [4 /*yield*/, (0, web3_js_1.sendAndConfirmTransaction)(utils_2.connection, CreatePIECEtx, [utils_2.operatorKEY])];
            case 9:
                // send transaction
                _f.apply(_e, [_g.apply("txhash: ", [_j.sent()])]);
                // confirmation
                console.log("\n* Successfully created new PIECE account called '".concat(PIECEslug, "' for operator '").concat(operatorID, "'!\n"));
                return [3 /*break*/, 11];
            case 10:
                _h = _j.sent();
                console.log(Error);
                console.log(Error.prototype.stack);
                return [3 /*break*/, 11];
            case 11: return [2 /*return*/];
        }
    });
}); };
CreatePIECE();
