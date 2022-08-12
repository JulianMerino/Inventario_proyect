import { TestBed } from '@angular/core/testing';

import { MarcaEquipoService } from './marca-equipo.service';

describe('MarcaEquipoService', () => {
  let service: MarcaEquipoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarcaEquipoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
