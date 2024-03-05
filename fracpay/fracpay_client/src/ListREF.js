"use strict";
/****************************************************************
 * Fracpay client ListPIECE					*
 * blairmunroakusa@.0322.anch.AK				*
 *								*
 * List PIECE lists all pieces linked to MAIN account.		*
 * Pieces are listed numbered to make CLI piece selection easy.	*
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
var prompt = require("prompt-sync")({ sigint: true });
var utils_1 = require("./utils");
/****************************************************************
 * main								*
 ****************************************************************/
var ListPIECE = function () { return __awaiter(void 0, void 0, void 0, function () {
    var operatorID, _a, pdaMAIN, bumpMAIN, MAIN, selectPIECE, pdaPIECEseed, _b, pdaPIECE, bumpPIECE, PIECE, countREF, pdaREFseed, _c, pdaREF, bumpREF, REF, _d;
    var _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                _f.trys.push([0, 16, , 17]);
                // setup
                return [4 /*yield*/, (0, utils_1.establishConnection)()];
            case 1:
                // setup
                _f.sent();
                return [4 /*yield*/, (0, utils_1.establishOperator)()];
            case 2:
                _f.sent();
                return [4 /*yield*/, (0, utils_1.checkProgram)()];
            case 3:
                _f.sent();
                operatorID = prompt("Please enter the operator ID: ");
                return [4 /*yield*/, (0, utils_1.deriveAddress)((0, utils_1.toUTF8Array)(operatorID))];
            case 4:
                _a = _f.sent(), pdaMAIN = _a[0], bumpMAIN = _a[1];
                console.log(". Operator MAIN pda:\t".concat(pdaMAIN.toBase58(), " found after ").concat(256 - bumpMAIN, " tries"));
                return [4 /*yield*/, (0, utils_1.getMAINdata)(pdaMAIN)];
            case 5:
                MAIN = _f.sent();
                // state intention
                console.log(". Listing ".concat(MAIN.piececount, " pieces associated with '").concat(operatorID, "' MAIN account.\n"), "\nPIECE\n");
                // print PIECE list
                return [4 /*yield*/, (0, utils_1.printPIECElist)(pdaMAIN, MAIN.piececount)];
            case 6:
                // print PIECE list
                _f.sent();
                selectPIECE = new Uint16Array(1);
                selectPIECE[0] = parseInt(prompt("From the PIECE list, please enter # to list REFs for: "));
                // check PIECE selection input
                if (selectPIECE[0] < 0 || selectPIECE[0] > MAIN.piececount) {
                    console.log("! You made an invalid selection. Type in a number, nothing else.");
                    process.exit(1);
                }
                pdaPIECEseed = (0, utils_1.createSeed)(pdaMAIN, selectPIECE);
                return [4 /*yield*/, (0, utils_1.deriveAddress)(pdaPIECEseed)];
            case 7:
                _b = _f.sent(), pdaPIECE = _b[0], bumpPIECE = _b[1];
                return [4 /*yield*/, (0, utils_1.getPIECEdata)(pdaPIECE)];
            case 8:
                PIECE = _f.sent();
                // state intention
                console.log(". Listing ".concat(PIECE.refcount, " REFs associated with '").concat(PIECE.pieceslug, "' PIECE account.\n"), "\nREF\n");
                countREF = new Uint16Array(1);
                countREF[0] = 0;
                pdaREFseed = (0, utils_1.createSeed)(pdaPIECE, countREF);
                return [4 /*yield*/, (0, utils_1.deriveAddress)(pdaREFseed)];
            case 9:
                _c = _f.sent(), pdaREF = _c[0], bumpREF = _c[1];
                return [4 /*yield*/, (0, utils_1.getREFdata)(pdaREF)];
            case 10:
                REF = _f.sent();
                // print self PIECE data
                console.log("# 0\tSELF:\t".concat(REF.refslug, "\n"), "\tFRACTION:\t".concat(REF.fract, "\n"), "\tNETSUM:\t\t".concat(REF.netsum, "\n"));
                countREF[0] = 1;
                _f.label = 11;
            case 11:
                if (!(countREF[0] <= PIECE.refcount)) return [3 /*break*/, 15];
                // find REF address
                pdaREFseed = (0, utils_1.createSeed)(pdaPIECE, countREF);
                return [4 /*yield*/, (0, utils_1.deriveAddress)(pdaREFseed)];
            case 12:
                _e = _f.sent(), pdaREF = _e[0], bumpREF = _e[1];
                return [4 /*yield*/, (0, utils_1.getREFdata)(pdaREF)];
            case 13:
                // get REF data
                REF = _f.sent();
                // print REF data
                console.log("# ".concat(countREF[0], "\tREF ID:\t").concat(REF.refslug, "\n"), "\tFRACTION:\t".concat(REF.fract, "\n"), "\tNETSUM:\t\t".concat(REF.netsum, "\n"));
                _f.label = 14;
            case 14:
                countREF[0]++;
                return [3 /*break*/, 11];
            case 15: return [3 /*break*/, 17];
            case 16:
                _d = _f.sent();
                console.log(Error);
                return [3 /*break*/, 17];
            case 17: return [2 /*return*/];
        }
    });
}); };
ListPIECE();
