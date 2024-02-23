// TODO: make tests for all cases for each function, group them with the decribe function

import { createChat, getChat } from "../backend/chat.js"
import db from "../db.js"
beforeEach(() => {
  db.prepare(`DELETE FROM Chatroom;`).run()
})
describe('createChat', () => {
  test('chat creation', () => {
    const res = { "chatid": "doe-john", "name": "doe-john" }
    expect(createChat(['john', 'doe']))
      .toStrictEqual(expect.objectContaining(res))

  })
})

describe('getChat', () => {
  test('get chat by chat id', () => {
    createChat(['john', 'doe'])
    const res = { "chatid": "doe-john", "name": "doe-john" }
    expect(getChat(['john', 'doe']))
      .toStrictEqual(expect.objectContaining(res))
  })
})
