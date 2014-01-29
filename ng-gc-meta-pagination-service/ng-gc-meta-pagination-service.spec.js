'use strict';

describe('MetaPaginationService', function(){
  beforeEach(module('ngGcMetaPaginationService'));

  var MetaPaginationService;

  beforeEach(inject(function ($injector) {
    MetaPaginationService = $injector.get('MetaPaginationService');
  }));

  it('#setMeta', function() {
    var data = {};
    var headerObject = {
      'X-Pagination': '{"page": 1}'
    };

    function headers(header) {
      return headerObject[header];
    }

    MetaPaginationService.setMeta(data, headers);
    expect(data).toEqualData({meta: { page: 1 }});
  });

});
