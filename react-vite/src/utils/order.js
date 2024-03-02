export const sortPastOrdersDesc = orders => {
  console.log(orders.forEach(order => console.log(order.updated_at, new Date(order.updated_at), new Date(order.updated_at).getTime())))
  return orders.sort((a, b) => new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime());
}
