import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'
import { AllEnterpriseModule, LicenseManager } from 'ag-grid-enterprise'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-balham.css'
import { AgGrid } from '@/shared/ui/ag-grid'

LicenseManager.setLicenseKey( 'Using_this_{AG_Grid}_Enterprise_key_{AG-087507}_in_excess_of_the_licence_granted_is_not_permitted___Please_report_misuse_to_legal@ag-grid.com___For_help_with_changing_this_key_please_contact_info@ag-grid.com___{Korea_Biznet_Co.,Ltd}_is_granted_a_{Single_Application}_Developer_License_for_the_application_{gsabis2}_only_for_{2}_Front-End_JavaScript_developers___All_Front-End_JavaScript_developers_working_on_{gsabis2}_need_to_be_licensed___{gsabis2}_has_not_been_granted_a_Deployment_License_Add-on___This_key_works_with_{AG_Grid}_Enterprise_versions_released_before_{7_May_2026}____[v3]_[01]_MTc3ODEwODQwMDAwMA==d8538634941b894796254c1934a67d91' )
ModuleRegistry.registerModules( [ AllCommunityModule, AllEnterpriseModule ] )

export default defineNuxtPlugin( ( { vueApp } ) => {
  vueApp.component( 'AgGrid', AgGrid )
} )

declare module 'vue' {
  export interface GlobalComponents {
    AgGrid: typeof AgGrid
  }
}