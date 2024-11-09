import { omit, getAssetMeta, reportError } from '../src/helper/utils'

describe('omit', () => {
  it('should return a new object without the omitted keys', () => {
    const originalObject = { a: 1, b: 2, c: 3 }
    const result = omit(originalObject, 'a', 'c')

    expect(result).toEqual({ b: 2 })
  })

  it('should return the original object if no keys are omitted', () => {
    const originalObject = { a: 1, b: 2, c: 3 }
    const result = omit(originalObject)

    expect(result).toEqual(originalObject)
  })

  it('should return an empty object if all keys are omitted', () => {
    const originalObject = { a: 1, b: 2, c: 3 }
    const result = omit(originalObject, 'a', 'b', 'c')

    expect(result).toEqual({})
  })

  it('should ignore keys that do not exist in the original object', () => {
    const originalObject = { a: 1, b: 2 }
    const result = omit(originalObject, 'a', 'b')

    expect(result).toEqual(originalObject)
  })

  it('should handle an empty object correctly', () => {
    const originalObject = {}
    const result = omit(originalObject)

    expect(result).toEqual({})
  })
})

describe('getAssetMeta', () => {
  it('should return the correct filename and extension from a full file path', () => {
    const result = getAssetMeta('/path/to/file/image.png')
    expect(result).toEqual({ name: 'image', ext: 'png' })
  })

  it('should handle files without an extension', () => {
    const result = getAssetMeta('/path/to/file/image')
    expect(result).toEqual({ name: 'image', ext: '' })
  })

  it('should handle files with multiple dots in the name', () => {
    const result = getAssetMeta('/path/to/file/archive.tar.gz')
    expect(result).toEqual({ name: 'archive.tar', ext: 'gz' })
  })

  it('should handle filenames without a directory path', () => {
    const result = getAssetMeta('video.mp4')
    expect(result).toEqual({ name: 'video', ext: 'mp4' })
  })

  it('should return an empty name and extension for an empty input', () => {
    const result = getAssetMeta('')
    expect(result).toEqual({ name: '', ext: '' })
  })
})

describe('reportError', () => {
  const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

  afterEach(() => {
    consoleErrorSpy.mockClear()
  })

  afterAll(() => {
    consoleErrorSpy.mockRestore()
  })

  it('should use window.reportError if available in the browser', () => {
    Object.defineProperty(global, 'window', {
      value: {
        reportError: jest.fn()
      },
      writable: true
    })

    const error = new Error('Test error')
    reportError(error)

    expect(window.reportError).toHaveBeenCalledWith(error)
  })

  it('should fallback to console.error if window.reportError is not available', () => {
    Object.defineProperty(global, 'window', {
      value: {},
      writable: true
    })

    const error = new Error('Test error')
    reportError(error)

    expect(consoleErrorSpy).toHaveBeenCalledWith('Error reported:', error.message)
  })

  it('should use console.error in a Node environment', () => {
    delete (global as any).window

    const error = new Error('Node error')
    reportError(error)

    expect(consoleErrorSpy).toHaveBeenCalledWith('Error reported (Node):', error.message)
  })
})
