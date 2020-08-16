"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _upload = _interopRequireDefault(require("../../../../../config/upload"));

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

var _mime = _interopRequireDefault(require("mime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class S3StorageProvider {
  constructor() {
    this.client = void 0;
    this.client = new _awsSdk.default.S3({
      region: process.env.AWS_DEFAULT_REGION
    });
  }

  async saveFile(file) {
    const originalPah = _path.default.resolve(_upload.default.tmpFolder, file);

    const ContentType = _mime.default.getType(originalPah);

    if (!ContentType) {
      throw new Error('Erro ao verificar tipo do arquivo.');
    } // const fileContent = await fs.promises.readFile(originalPah, {
    //   encoding: 'utf-8',
    // }); // só pode colocar utf8 quando é arquivo text, imagem não pode


    const fileContent = await _fs.default.promises.readFile(originalPah);
    await this.client.putObject({
      Bucket: _upload.default.config.aws.bucket,
      Key: file,
      ACL: 'public-read',
      Body: fileContent,
      ContentType,
      ContentDisposition: `inline; filename=${file}`
    }).promise();
    await _fs.default.promises.unlink(originalPah);
    return file;
  }

  async deleteFile(file) {
    await this.client.deleteObject({
      Bucket: _upload.default.config.aws.bucket,
      Key: file
    }).promise();
  }

}

var _default = S3StorageProvider;
exports.default = _default;