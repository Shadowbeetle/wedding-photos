import page from 'page'
import React from "react"
import qs from 'query-string'
import _ from 'lodash'
import Photos from "../pages/photos"
import Videos from "../pages/videos"
import { globalStore } from '../stores'

function parseQueryString(ctx, next) {
  ctx.query = qs.parse(window.location.search)
  if (ctx.query.lang) {
    window.localStorage.setItem('lang', ctx.query.lang)
  }
  next()
}

function getLang(ctx, next) {
  ctx.lang = ctx.query.lang || window.localStorage.getItem('lang') || 'hu'
  next()
}

function authorize (ctx, next) {
  if (!globalStore.guestId) {
    const id = ctx.params.guestId || localStorage.getItem('guestId')
    globalStore.fetchUser(id)
      .then(() => next())
      .catch((err) => {
        if (_.get(err, 'response.status') === 403) {
          window.location.href = 'http://anna-tamas-eskuvo.com'
        }
      })
  } else {
    next()
  }
}

export default function router (self) {
  page('*', parseQueryString)
  page('*', getLang)

  page('/', authorize, () => {
    page.redirect(`/guest/${globalStore.guestId}/photos`)
  })

  page('/guest/:guestId', authorize, (ctx) => {
    page.redirect(`/guest/${ctx.params.guestId}/photos`)
  })

  page('/guest/:guestId/photos', authorize, (ctx) => {
    self.setState({component: <Photos lang={ctx.lang} store={globalStore}/>})
  })

  page('/guest/:guestId/videos', authorize, (ctx) => {
    self.setState({component: <Videos lang={ctx.lang} store={globalStore}/>})
  })

  page.start()
}
