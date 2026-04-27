import type { CodeBoxTypeProps } from './GsabisCodeBox.types'

const codeBoxTypes: Record<CodeBoxModalType | string, () => CodeBoxTypeProps> = {
  'customer': () => ( {
    ...getDefaultCustomerParams(),
    params: { custDiv: '' },
    title: 'Customer',
    commonCodeParams: [ {
      key: 'custDiv', //입고유형
      divCd: 'CUST_SUB_DIV',
      busId: 'B3',
    } ],
  } ),
  'pkg': () => ( {
    api: `/api/v1/b3/cmn/pkg/search/code`,
    menuPath: '/b/CmnCommonModal',
    width: 600,
    height: 600,
    title: 'Package Code'
  } ),
  'cntr': () => ( {
    api: `/api/v1/b3/cmn/cntr/search/code`,
    menuPath: '/b/CmnCommonModal',
    width: 600,
    height: 600,
    title: 'Container Size'
  } ),
  'item': () => ( {
    api: `/api/v1/b3/cmn/item/search/code`,
    menuPath: '/b/CmnCommonModal',
    width: 600,
    height: 600,
    title: 'Item'
  } ),
  'user': () => ( {
    api: `/api/v1/b2/cbi/user/search/code`,
    menuPath: '/b/CmnCommonModal',
    width: 600,
    height: 600,
    title: 'User'
  } ),
  'emp': () => ( {
    api: `/api/v1/b2/cbi/emp/search/code`,
    menuPath: '/b/CmnCommonModal',
    width: 600,
    height: 600,
    title: 'User'
  } ),
  'dept': () => ( {
    api: `/api/v1/b2/cbi/dept/search/code`,
    menuPath: '/b/CmnCommonModal',
    width: 600,
    height: 600,
    title: 'User'
  } ),
  'city': () => ( {
    api: `/api/v1/b3/cmn/city/search/code`,
    menuPath: '/b/CmnCommonModal',
    width: 600,
    height: 600,
    title: 'City'
  } ),
  'location': () => ( {
    api: `/api/v1/b3/cmn/location/search/code`,
    menuPath: '/b/CmnLocationModal',
    width: 700,
    height: 600,
    title: 'Location'
  } ),
  'place': () => ( {
    api: `/api/v1/b3/cmn/place/search/code`,
    menuPath: '/b/CmnCommonModal',
    width: 600,
    height: 600,
    title: 'Place'
  } ),
  'car': () => ( {
    api: `/api/v1/b3/cmn/car/search/code`,
    menuPath: '/b/CmnCommonModal',
    width: 600,
    height: 600,
    title: 'Car'
  } ),
  'hs': () => ( {
    api: `/api/v1/b3/cmn/hs/search/code`,
    menuPath: '/b/CmnCommonModal',
    width: 600,
    height: 600,
    title: 'H/S'
  } ),
  'ctms': () => ( {
    api: `/api/v1/b3/cmn/ctms/search/code`,
    menuPath: '/b/CmnCommonModal',
    width: 600,
    height: 600,
    title: 'CTMS'
  } ),
  'customs': () => ( {
    api: `/api/v1/b3/cmn/customs/search/code`,
    menuPath: '/b/CmnCommonModal',
    width: 600,
    height: 600,
    title: 'Customs'
  } ),
  'undg': () => ( {
    api: `/api/v1/b3/cmn/undg/search/code`,
    menuPath: '/b/CmnCommonModal',
    width: 600,
    height: 600,
    title: 'Customs'
  } ),
  'sysCode': () => ( {
    api: `/api/v1/b1/sib/sys/code/search/code`,
    menuPath: '/b/CmnCommonModal',
    width: 600,
    height: 600,
    title: 'System Code'
  } ),
  'port': () => ( {
    api: `/api/v1/ports/allList`,
    menuPath: '/b/CmnCommonModal',
    width: 600,
    height: 600,
    title: 'Port List'
  } )
}

const getDefaultCustomerParams: () => CodeBoxTypeProps = () => {
  return {
    api: `/api/v1/b3/cmn/cust/search/code`,
    menuPath: '/b/CmnCustModal',
    width: 800,
    height: 600,
  }
}

export type CodeBoxModalType =
  'customer' | 'user' | 'pkg' | 'cntr' | 'item'| 'city' |
  'location' | 'dept' | 'place' | 'car' | 'emp' | 'ctms' |
  'customs' | 'hs' | 'undg' | 'sysCode' | 'port'

export {
  codeBoxTypes,
}
