import { createSelector } from 'reselect'

import { getSavedVariantsByGuid } from 'redux/selectors'
import { getVariantsExportData } from 'shared/utils/constants'

export const getSearchedVariants = state => state.searchedVariants
export const getSearchedVariantsIsLoading = state => state.searchedVariantsLoading.isLoading
export const getSearchedVariantsErrorMessage = state => state.searchedVariantsLoading.errorMessage
export const getSearchesByHash = state => state.searchesByHash
export const getVariantSearchDisplay = state => state.variantSearchDisplay

export const getCurrentSearchParams = createSelector(
  getSearchesByHash,
  (state, props) => props.queryParams.search,
  (searchesByHash, searchHash) => searchesByHash[searchHash],
)

export const getTotalVariantsCount = createSelector(
  getCurrentSearchParams,
  searchParams => (searchParams || {}).totalResults,
)

export const getSearchedVariantsWithSavedVariants = createSelector(
  getSearchedVariants,
  getSavedVariantsByGuid,
  (searchedVariants, savedVariantsByGuid) =>
    searchedVariants.map(variant =>
      (variant.variantGuid ? savedVariantsByGuid[variant.variantGuid] : variant),
    ),
)

export const getSearchedVariantExportConfig = createSelector(
  getSearchedVariantsWithSavedVariants,
  variants => [{
    name: 'Variant Search Results',
    data: {
      filename: 'searched_variants',
      ...getVariantsExportData(variants),
    },
  }],
)
