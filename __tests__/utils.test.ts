import { omit, getAssetMeta, reportError } from '../src/helper/utils'

describe('omit', () => {
  let consoleErrorSpy: jest.SpyInstance

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()
  })

  afterEach(() => {
    consoleErrorSpy.mockRestore()
  })

  test('should return a new object without the omitted keys', () => {
    const originalObject = { a: 1, b: 2, c: 3 }
    const result = omit(originalObject, 'a', 'c')

    expect(result).toEqual({ b: 2 })
  })

  test('should return the original object if no keys are omitted', () => {
    const originalObject = { a: 1, b: 2, c: 3 }
    const result = omit(originalObject)

    expect(result).toEqual(originalObject)
  })

  test('should return an empty object if all keys are omitted', () => {
    const originalObject = { a: 1, b: 2, c: 3 }
    const result = omit(originalObject, 'a', 'b', 'c')

    expect(result).toEqual({})
  })

  test('should ignore keys that do not exist in the original object', () => {
    const originalObject = { a: 1, b: 2 }
    const result = omit(originalObject, 'a', 'b')

    expect(result).toEqual({})
  })

  test('should handle an empty object correctly', () => {
    const originalObject = {}
    const result = omit(originalObject)

    expect(result).toEqual({})
  })
})

describe('getAssetMeta', () => {
  test('should return the correct filename and extension from a full file path', () => {
    const result = getAssetMeta('/path/to/file/image.png')
    expect(result).toEqual({ name: 'image', ext: 'png' })
  })

  //   it('should handle files without an extension', () => {
  //     const result = getAssetMeta('/path/to/file/image')`
  //     expect(result).toEqual({ name: 'image', ext: '' })
  //   })

  test('should handle files with multiple dots in the name', () => {
    const result = getAssetMeta('/path/to/file/archive.tar.gz')
    expect(result).toEqual({ name: 'archive.tar', ext: 'gz' })
  })

  test('should handle filenames without a directory path', () => {
    const result = getAssetMeta('video.mp4')
    expect(result).toEqual({ name: 'video', ext: 'mp4' })
  })

  test('should return an empty name and extension for an empty input', () => {
    const result = getAssetMeta('')
    expect(result).toEqual({ name: '', ext: '' })
  })
})

describe('reportError', () => {
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('should log an Error object to console.error', () => {
    const error = new Error('Test error');

    reportError(error);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Reported Error to our external service:', 
      error
    );
  });
});