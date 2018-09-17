import { TestBed } from '@angular/core/testing';

import { PathStorageService } from './path-storage.service';

describe('PathStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PathStorageService = TestBed.get(PathStorageService);
    expect(service).toBeTruthy();
  });
});
