"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImages = exports.uploadMainImage = void 0;
const dotenv_1 = require("dotenv");
const cloudinary_1 = require("cloudinary");
(0, dotenv_1.config)();
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
    secure: true,
});
const uploadMainImage = (main_image, folderName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield cloudinary_1.v2.uploader.upload(main_image, {
            folder: `/products/${folderName}`,
        });
        return result.url;
    }
    catch (error) {
        return error;
    }
});
exports.uploadMainImage = uploadMainImage;
const uploadImages = (imagesArray, folderName) => {
    const images = [];
    imagesArray.forEach((image) => {
        cloudinary_1.v2.uploader
            .upload(image, { folder: `/products/${folderName}/${image}` })
            .then((result) => {
            images.push(result.url);
        });
    });
    return images;
};
exports.uploadImages = uploadImages;
