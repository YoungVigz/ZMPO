import { UtilsConfig } from "./UtilsConfig.js";

const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

const utils = document.querySelectorAll(".util")
const utilsConfig = new UtilsConfig(utils)
