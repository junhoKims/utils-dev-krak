import { measureFPS } from "./measureFPS.js"

describe('measureFPS', () => {
  test('1초당 fps를 리턴한다', async () => {
    const fps = await measureFPS();
    expect(fps).toBeGreaterThan(55)
    
  })
})  