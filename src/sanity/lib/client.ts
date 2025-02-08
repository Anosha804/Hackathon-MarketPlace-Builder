import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token:"skfvmWgcxxRqqEggZKerzxgTH8KZ7uKDwMWwhSohuN4A32qWBHgu9mzQtsncqPBppV3oMQ9yNuyrdZdhtf5ADGNUtVXzzS6yx5syh3CaKVo4tkVsekj1jeVQPwkPZBzFAP5yz6DvXwJafyFAZoIj9SvwbBUptwGOm3OkPeg8SS7PwaQMbJNR",
})
