import { gql } from "@apollo/client";

export const GET_CHANNELS = gql`
  query Pagination(
    $pubkey: String!
    $page: PageInput
    $order: OrderChannelInput
  ) {
    getNode(pubkey: $pubkey) {
      graph_info {
        channels {
          channel_list(page: $page, order: $order) {
            pagination {
              limit
              offset
            }
            list {
              block_age
              capacity
              last_update
              last_update_date
              long_channel_id
              node2_pub
              short_channel_id
              node2_info {
                node {
                  alias
                }
              }
            }
          }
        }
      }
    }
  }
`;
