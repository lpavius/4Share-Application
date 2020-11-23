import { TestBed } from '@angular/core/testing';

import { ApiFilesService } from './api-files.service';

describe('ApiFilesService', () => {
  let service: ApiFilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiFilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
