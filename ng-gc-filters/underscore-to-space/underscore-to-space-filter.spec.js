'use strict';

describe('underscoreToSpace', function() {
  beforeEach(module('ngGcUnderscoreToSpace'));

  it('underscores to spaces', inject(function(underscoreToSpaceFilter) {
    expect(underscoreToSpaceFilter('p_aym_ent')).toEqual('p aym ent');
  }));

  it('returns empty string', inject(function(underscoreToSpaceFilter) {
    expect(underscoreToSpaceFilter([])).toEqual('');
  }));
});
