import { TestBed, inject } from '@angular/core/testing';

import { NgxFreshchatLibService } from './ngx-freshchat-lib.service';

describe('NgxFreshchatLibService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxFreshchatLibService]
    });
  });

  it('should be created', inject([NgxFreshchatLibService], (service: NgxFreshchatLibService) => {
    expect(service).toBeTruthy();
  }));
});
