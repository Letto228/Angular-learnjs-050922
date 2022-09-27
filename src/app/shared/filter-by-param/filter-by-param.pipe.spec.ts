import { FilterByParamPipe } from './filter-by-param.pipe';

const stubArray = [
  {
    brand: {
      name: 'Apple',
    },
    name: 'Tablet',
    price: 50,
  },
  {
    brand: {
      name: 'Asus',
    },
    name: 'Laptop',
    price: 100,
  },
  {
    brand: {
      name: 'Dell',
    },
    name: 'Keybord',
    price: 10,
  }
];

describe('FilterByParamPipe', () => {
  let pipe: FilterByParamPipe;

  beforeEach(() => {
    pipe = new FilterByParamPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should correctly filter by simple param', () => {
    expect(pipe.transform(stubArray, 'lap', 'name')).toEqual(stubArray.slice(1, 2));

    expect(pipe.transform(stubArray, '10', 'price')).toEqual(stubArray.slice(1));
  });

  it('should correctly filter by compound param', () => {
    expect(pipe.transform(stubArray, 'appl', 'brand.name')).toEqual(stubArray.slice(0, 1));
  });
});
