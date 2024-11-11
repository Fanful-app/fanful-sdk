import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'

global.mock = new MockAdapter(axios)

afterEach(() => {
    global.mock.reset()
})
