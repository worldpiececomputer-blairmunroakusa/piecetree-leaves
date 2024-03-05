"use strict";
/****************************************************************
 * Fracpay client CreateMAIN					*
 * blairmunroakusa@.0322.anch.AK				*
 *								*
 * CreateMAIN creates a new operator.				*
 * One each of MAIN, self PIECE, self REF accounts are created.	*
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
// misc solana
var web3_js_1 = require("@solana/web3.js");
// utility functions
var utils_1 = require("./utils");
// utility constants
var utils_2 = require("./utils");
/****************************************************************
 * main								*
 ****************************************************************/
var CreateMAIN = function () { return __awaiter(void 0, void 0, void 0, function () {
    var operatorID, countPIECE, countREF, _a, pdaMAIN, bumpMAIN, pdaPIECEseed, _b, pdaPIECE, bumpPIECE, pdaREFseed, _c, pdaREF, bumpREF, ixDATA, CreateMAINtx, _d, _e, _f, _g;
    return __generator(this, function (_h) {
        switch (_h.label) {
            case 0:
                _h.trys.push([0, 9, , 10]);
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
                operatorID = prompt("Please enter your new operator ID: ");
                // check to make sure ID is right size
                if ((0, utils_1.toUTF8Array)(operatorID).length > utils_2.PIECESLUG_SIZE) {
                    console.log("! Memory limitations require operator IDs shorter than 63 Bytes (ie 63 standard characters).\n", " You chose an ID that exceeds this limit. Please try a smaller ID.");
                    process.exit(1);
                }
                // check to make sure ID is available
                return [4 /*yield*/, (0, utils_1.availableIDcheck)(operatorID)];
            case 4:
                // check to make sure ID is available
                _h.sent();
                countPIECE = new Uint16Array(1);
                countREF = new Uint16Array(1);
                countPIECE[0] = 0;
                countREF[0] = 0;
                return [4 /*yield*/, (0, utils_1.deriveAddress)((0, utils_1.toUTF8Array)(operatorID))];
            case 5:
                _a = _h.sent(), pdaMAIN = _a[0], bumpMAIN = _a[1];
                console.log(". New MAIN pda:\t\t".concat(pdaMAIN.toBase58(), " found after ").concat(256 - bumpMAIN, " tries"));
                pdaPIECEseed = (0, utils_1.createSeed)(pdaMAIN, countPIECE);
                return [4 /*yield*/, (0, utils_1.deriveAddress)(pdaPIECEseed)];
            case 6:
                _b = _h.sent(), pdaPIECE = _b[0], bumpPIECE = _b[1];
                console.log(". New MAIN self-PIECE:\t".concat(pdaPIECE.toBase58(), " found after ").concat(256 - bumpPIECE, " tries"));
                pdaREFseed = (0, utils_1.createSeed)(pdaPIECE, countREF);
                return [4 /*yield*/, (0, utils_1.deriveAddress)(pdaREFseed)];
            case 7:
                _c = _h.sent(), pdaREF = _c[0], bumpREF = _c[1];
                console.log(". New PIECE self-REF:\t".concat(pdaREF.toBase58(), " found after ").concat(256 - bumpREF, " tries"));
                ixDATA = [0, bumpMAIN, bumpPIECE, bumpREF]
                    .concat(pdaREFseed)
                    .concat(pdaPIECEseed)
                    .concat((0, utils_1.toUTF8Array)(operatorID));
                console.log(ixDATA);
                CreateMAINtx = (0, utils_1.createTX)(pdaMAIN, pdaPIECE, pdaREF, pdaREF, ixDATA);
                // send transaction
                _e = (_d = console).log;
                _f = "txhash: ".concat;
                return [4 /*yield*/, (0, web3_js_1.sendAndConfirmTransaction)(utils_2.connection, CreateMAINtx, [utils_2.operatorKEY])];
            case 8:
                // send transaction
                _e.apply(_d, [_f.apply("txhash: ", [_h.sent()])]);
                // confirmation
                console.log("\n* Successfully created new MAIN account for operator '".concat(operatorID, "'!\n"));
                return [3 /*break*/, 10];
            case 9:
                _g = _h.sent();
                console.log(Error);
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}); };
CreateMAIN();
