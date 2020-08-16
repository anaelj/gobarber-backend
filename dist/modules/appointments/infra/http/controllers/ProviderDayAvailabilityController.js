"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ListProviderDayAvailabilityService = _interopRequireDefault(require("../../../services/ListProviderDayAvailabilityService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProviderDayAvailabilityController {
  async index(request, response) {
    const {
      day,
      year,
      month
    } = request.query;
    const {
      provider_id
    } = request.params;

    const listProviderDayAvailabilityService = _tsyringe.container.resolve(_ListProviderDayAvailabilityService.default);

    const availability = await listProviderDayAvailabilityService.execute({
      provider_id,
      day: Number(day),
      year: Number(year),
      month: Number(month)
    });
    return response.json(availability);
  }

}

exports.default = ProviderDayAvailabilityController;