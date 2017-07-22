import page from 'page'
import React from "react"
import qs from 'query-string'
import Photos from "../pages/photos"
import Videos from "../pages/videos"
import { globalStore } from '../stores'

function parseQueryString(ctx, next) {
  ctx.query = qs.parse(window.location.search)
  next()
}

function getLang(ctx, next) {
  ctx.lang = ctx.query.lang || 'hu'
  next()
}

export default function router (self) {
  page('*', parseQueryString)
  page('*', getLang)

  page('/', (ctx) => {
    page.redirect('/photos')
  })

  page('/photos', (ctx) => {
    self.setState({component: <Photos lang={ctx.lang} store={globalStore}/>})
  })

  page('/videos', (ctx) => {
    self.setState({component: <Videos lang={ctx.lang} store={globalStore}/>})
  })

  page.start()
}
