# parcel-namer-struct

Custom dest file struct by type and regexp.  
Inspired by <https://github.com/vseventer/parcel-namer-custom>.

## Installation

```shell
npm i -D parcel-namer-struct
```

or use `yarn`

```shell
yarn add --dev parcel-namer-struct
```


## Configuration

Add a `.parcelrc` into your project root directory (next to package.json):

```json
{
  "extends": "@parcel/config-default",
  "namers": [
    "parcel-namer-struct",
    "..."
  ]
}
```

Then set `parcel-namer-struct` field in `package.json`
```json
// package.json
{
  "parcel-namer-struct": [
    {
      type: 'match-bundle-type',         // Optional. Can be `'string'` or `['type', 'type2']`
      match: '^match-source-path$',      // Optional. Match source path (not dist path).
      dest: 'placement-dir',
    },
    {
      match: '/index/index.html',
      dest: '/',
    },
    {
      type: ['png', 'jpg'],
      dest: '/images/',
    }
  ]
}

// /src/index/index.html -> /index.html
// /src/assets/test.png -> /images/test.png
```
