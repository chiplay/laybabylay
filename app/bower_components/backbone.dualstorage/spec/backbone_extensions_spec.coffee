{Backbone, localStorage} = window

describe 'monkey patching', ->
  it 'aliases Backbone.sync to backboneSync', ->
    expect(window.backboneSync).toBeDefined()
    expect(window.backboneSync.identity).toEqual('sync')

describe 'offline localStorage sync', ->
  {collection} = {}
  beforeEach ->
    localStorage.clear()
    localStorage.setItem 'cats', '2,3,a'
    localStorage.setItem 'cats_dirty', '2,a'
    localStorage.setItem 'cats_destroyed', '3'
    localStorage.setItem 'cats2', '{"id": "2", "color": "auburn"}'
    localStorage.setItem 'cats3', '{"id": "3", "color": "burgundy"}'
    localStorage.setItem 'catsa', '{"id": "a", "color": "scarlet"}'
    collection = new Backbone.Collection [
      {id: 2, color: 'auburn'},
      {id: 3, color: 'burgundy'},
      {id: 'a', color: 'scarlet'}
    ]
    collection.url = -> 'cats'

  describe 'syncDirtyAndDestroyed', ->
    it 'calls syncDirty and syncDestroyed', ->
      syncDirty = spyOn Backbone.Collection.prototype, 'syncDirty'
      syncDestroyed = spyOn Backbone.Collection.prototype, 'syncDestroyed'
      collection.syncDirtyAndDestroyed()
      expect(syncDirty).toHaveBeenCalled()
      expect(syncDestroyed).toHaveBeenCalled()

  describe 'syncDirty', ->
    it 'finds and saves all dirty models', ->
      saveInteger = spyOn(collection.get(2), 'save').andCallThrough()
      saveString = spyOn(collection.get('a'), 'save').andCallThrough()
      collection.syncDirty()
      expect(saveInteger).toHaveBeenCalled()
      expect(saveString).toHaveBeenCalled()
      expect(localStorage.getItem 'cats_dirty').toBeFalsy()

    it 'works when there are no dirty records', ->
      localStorage.removeItem 'cats_dirty'
      collection.syncDirty()

  describe 'syncDestroyed', ->
    it 'finds all models marked as destroyed and destroys them', ->
      destroy = spyOn collection.get(3), 'destroy'
      collection.syncDestroyed()
      expect(localStorage.getItem 'cats_destroyed').toBeFalsy()

    it 'works when there are no destroyed records', ->
      localStorage.setItem 'cats_destroyed', ''
      collection.syncDestroyed()
