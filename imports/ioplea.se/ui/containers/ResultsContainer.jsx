import React, { Component } from 'react'
import { createContainer } from 'meteor/react-meteor-data'

import { Results } from '../components/Results.jsx'

import { Stuffs } from '../../common/collections/stuffs.js'
import { Things } from '../../common/collections/things.js'

const STUFF_LIMIT = 'session-stuff-limit'
const STUFF_SORT = 'session-stuff-sort'

export default ResultsContainer = createContainer(({
  query, thingId, setStuffCount, searchResults, setQuery, sortBy, kindId
}) => {
  const defaultLimit = 12
  const defaultSort = sortBy || "numCompats"
  Session.setDefault(STUFF_LIMIT, defaultLimit)
  Session.setDefault(STUFF_SORT, defaultSort)

  let loading = true
  let loadingMore = false
  let stuffs = []
  let thingIds = []
  let thingName = ""
  let _thingId = thingId // Necessary for excluding current Thing from list of compatibilities for this stuff
  let onlyThing = false
  let thingSelected = false
  let thing = undefined
  let thingLoading = false
  let totalStuffCount = 0

  if(thingId) {
    const thingHandle = Meteor.subscribe('thing', thingId)
    thingLoading = !thingHandle.ready()
    thing = Things.findOne(thingId)
    thingIds = [thingId]
    thingName = query
    thingSelected = true
  } else if(searchResults) {
    thingIds = _.map(searchResults, (r) => { return r.objectID })

    // If only one matching Thing, show all stuff for that
    if(searchResults.length === 1) {
      thingName = searchResults[0].name
      _thingId = searchResults[0].objectID
      thing = searchResults[0]
      onlyThing = true
      thingSelected = true
    }
  }

  if(thing) {
    DocHead.removeDocHeadAddedTags()

    DocHead.setTitle("Do stuff with " + thing.name)
    var metaInfo =[
      {
        name: "description",
        content: "Find out what kind of stuff you can do with your " + thing.name + ". " + thing.description,
      },
    ]

    _.each(metaInfo, m => {
      DocHead.addMeta(m)
    })
  }

  // Only show Stuffs if there are Things matching query
  if(thingIds && (thingIds.length > 0)) {
    const limit = Session.get(STUFF_LIMIT)
    const sort = Session.get(STUFF_SORT)
    const stuffsHandle = Meteor.subscribe("stuffs.forThings", thingIds, limit, sort)

    if(stuffsHandle.ready()) {
      stuffs = Stuffs.find({}, {sort: [[sort, "desc"]]}).fetch()
      loading = false
    } else if(limit > defaultLimit) {
      stuffs = Stuffs.find({}).fetch()
      loading = false
      loadingMore = true
    }
    totalStuffCount = Counts.get(`stuffs.forThings.${thingIds}`)
  } else if(kindId) {
    const limit = Session.get(STUFF_LIMIT)
    const sort = Session.get(STUFF_SORT)
    const stuffsHandle = Meteor.subscribe("stuffs.forKind", kindId, limit, sort)

    if(stuffsHandle.ready()) {
      stuffs = Stuffs.find({}, {sort: [[sort, "desc"]]}).fetch()
      loading = false

    } else if(limit > defaultLimit) {
      stuffs = Stuffs.find({}).fetch()
      loading = false
      loadingMore = true

    }
    totalStuffCount = Counts.get(`stuffs.forKind.${kindId}`)
  } else {
    loading = false
  }

  loading = loading || thingLoading

  return {
    stuffs,
    loading,
    onlyThing,
    thingName,
    thingSelected,
    thingId: _thingId,
    setQuery,
    totalStuffCount,
    loadingMore,
    thing,
    thingLoading
  };
}, Results)
