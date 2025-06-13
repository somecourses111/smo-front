/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC, useEffect} from 'react'
import {toAbsoluteUrl} from '../../../helpers'
import {useLang, setLanguage} from '../../../i18n/Metronici18n'

const languages = [
  {
    lang: 'en',
    name: 'English',
    flag: toAbsoluteUrl('/media/flags/united-states.svg'),
  },
  {
    lang: 'ar',
    name: 'Arabic',
    flag: toAbsoluteUrl('/media/flags/united-arab-emirates.svg'),
  },
]

const Languages: FC = () => {
  const lang = useLang()
  const currentLanguage = languages.find((x) => x.lang === lang)
  useEffect(() => {
    if (currentLanguage?.lang === "ar") {
        document.documentElement.setAttribute("dir", "rtl")
        document.documentElement.setAttribute("lang", "ar")
        document.documentElement.setAttribute("direction", "rtl")
        document.documentElement.setAttribute("style", "direction: rtl")
        //sidebar
        document.body.setAttribute('data-kt-app-sidebar-panel-fixed_rtl', 'right')
        //sidebar
        document.body.setAttribute('data-kt-app-sidebar-fixed_rtl', 'right')
        //main contain between sidebar and header
        document.body.setAttribute('data-kt-app-sidebar-fixed_rtl', 'right')
    }
    else{
        document.documentElement.setAttribute("dir", "")
        document.documentElement.setAttribute("lang", "en")
        document.documentElement.setAttribute("direction", "ltr")
        document.documentElement.setAttribute("style", "direction: ltr")
        //sidebar
        document.body.setAttribute('data-kt-app-sidebar-panel-fixed_rtl', 'left')
        //sidebar
        document.body.setAttribute('data-kt-app-sidebar-fixed_rtl', 'left')
        //main contain between sidebar and header
        document.body.setAttribute('data-kt-app-sidebar-fixed_rtl', 'left')

    }
  },[currentLanguage?.lang])

  return (
    <div
      className='menu-item px-5'
      data-kt-menu-trigger='hover'
      data-kt-menu-placement='left-start'
      data-kt-menu-flip='bottom'
    >
      <a href='#' className='menu-link px-5'>
        <span className='menu-title position-relative'>
          Language
          <span className='fs-8 rounded bg-light px-3 py-2 position-absolute translate-middle-y top-50 end-0'>
            {currentLanguage?.name}{' '}
            <img
              className='w-15px h-15px rounded-1 ms-2'
              src={currentLanguage?.flag}
              alt='metronic'
            />
          </span>
        </span>
      </a>

      <div className='menu-sub menu-sub-dropdown w-175px py-4'>
        {languages.map((l) => (
          <div
            className='menu-item px-3'
            key={l.lang}
            onClick={() => {
              setLanguage(l.lang)
            }}
          >
            <a
              href='#'
              className={clsx('menu-link d-flex px-5', {active: l.lang === currentLanguage?.lang})}
            >
              <span className='symbol symbol-20px me-4'>
                <img className='rounded-1' src={l.flag} alt='metronic' />
              </span>
              {l.name}
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export {Languages}
