"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const diagnoses_1 = __importDefault(require("../data/diagnoses"));
const diagnose = diagnoses_1.default;
const getEntries = () => {
    return diagnose;
};
const addDiary = () => {
    return null;
};
exports.default = {
    getEntries,
    addDiary
};
