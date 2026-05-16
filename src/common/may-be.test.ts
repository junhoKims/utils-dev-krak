import {MayBe} from "@/common/may-be.js";

describe('may-be', () => {
  test('first', () => {

    const posts = MayBe.of(getPosts()).map((arr) => arr.data).map(arr => arr.children).chain(arr => arr.map(x => ({
      title: x.title,
      comments: MayBe.of(getComments()).chain(x => x)
    })))

    expect(posts[0]!.title).toBe('1')
  })
})

function getComments() {
  return ['comment1', 'comment2', 'comment3']
}

function getPosts() {
  return {
    kind: 'list',
    data: {
      modhash: 4,
      children: [
        {
          url: '1',
          title: '1'
        },
        {
          url: '2',
          title: '2'
        }
      ]
    }
  } as const;
}