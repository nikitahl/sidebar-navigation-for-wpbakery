export default function initUndoRedo () {
  'use strict'

  const undoRedoCore = {
    stack: [],
    stackPosition: 0,
    stackHash: JSON.stringify(''),
    zeroState: null,
    locked: false,
    add: function (data) {
      // Do not store same data again
      if (null === this.zeroState) {
        this.setZeroState(data)
      }
      if (this.stackHash === JSON.stringify(data)) {
        return
      }
      if (this.can('redo')) {
        this.stack = this.stack.slice(0, this.stackPosition)
      }
      this.stack.push(data)
      this.stackPosition = this.stack.length
      this.stackHash = JSON.stringify(this.get())
    },
    can: function (what) {
      let result = false
      if ('undo' === what) {
        result = this.stack.length > 0 && this.stackPosition > 0
      } else if ('redo' === what) {
        result = this.stack.length > 0 && this.stackPosition < this.stack.length
      }

      return result
    },
    undo: function () {
      if (this.can('undo')) {
        this.stackPosition -= 1
        this.stackHash = JSON.stringify(this.get())
      }
    },
    redo: function () {
      if (this.can('redo')) {
        this.stackPosition += 1
        this.stackHash = JSON.stringify(this.get())
      }
    },
    set: function (index) {
      if (this.stackPosition < index) {
        this.stack = this.stack.slice(index - this.stackPosition)
        this.stackHash = JSON.stringify(this.get())
        return true
      }
      return false
    },
    get: function () {
      if (this.stackPosition < 1) {
        return this.zeroState
      } else {
        return this.stack[ this.stackPosition - 1 ]
      }
    },
    setZeroState: function (data) {
      this.zeroState = data
      this.stackHash = JSON.stringify(this.get())
    }
  }

  const undoRedoApi = {
    add: function (document) {
      if (true !== undoRedoCore.locked) {
        console.log('undo redo add')
        console.log('=======')
        undoRedoCore.add(document)
        window.vc.events.trigger('undoredo:add', document)
      }
    },
    getCurrentPosition: function () {
      return undoRedoCore.stackPosition
    },
    undo: function () {
      undoRedoCore.undo()
      window.vc.events.trigger('undoredo:undo')
      return undoRedoApi.get()
    },
    redo: function () {
      undoRedoCore.redo()
      window.vc.events.trigger('undoredo:redo')
      return undoRedoApi.get()
    },
    get: function () {
      return undoRedoCore.get()
    },
    canUndo: function () {
      return !this.isLocked() && undoRedoCore.can('undo')
    },
    canRedo: function () {
      return !this.isLocked() && undoRedoCore.can('redo')
    },
    setZeroState: function (data) {
      if (null === undoRedoCore.zeroState) {
        this.add(data)
      } else {
        undoRedoCore.setZeroState(data)
      }
    },
    lock: function () {
      undoRedoCore.locked = true
      window.vc.events.trigger('undoredo:lock')
    },
    unlock: function () {
      undoRedoCore.locked = false
      window.vc.events.trigger('undoredo:unlock')
    },
    isLocked: function () {
      return true === undoRedoCore.locked
    }
  }

  if ('undefined' === typeof window.vc) {
    window.vc = {}
  }
  window.vc.undoRedoApi = undoRedoApi

  window.vc.events.on('afterLoadShortcode', (model) => {
    console.log('afterLoadShortcode', model)
  })

  window.vc.events.on('templateAdd', (model) => {
    console.log('templateAdd', model)
  })

  window.vc.events.on('shortcodeView:updated', (model) => {
    console.log('shortcodeView:updated', model)
  })

  window.vc.events.on('shortcodeView:destroyed', (model) => {
    console.log('shortcodeView:destroyed', model)
  })

  // not working
  window.vc.events.on('shortcodeView:dragEnded', (model) => {
    console.log('shortcodeView:dragEnded', model)
  })


}
