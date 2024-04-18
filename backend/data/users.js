const bcrypt = require('bcryptjs')

const users = [
  {
    name: 'Roopesh',
    email: 'roopeshsaravanan.dev@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
    shippingAddress: {
      address: 'NO192, Jalan Swift, Taman Swift',
      postCode: '41700',
      city: 'Puchong',
      state: 'Selangor'
    },
    credit: 0,
  },
  {
    name: 'Admin',
    email: 'admin@admin.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
    shippingAddress: {
      address: 'NO192, Jalan Swift, Taman Swift',
      postCode: '41700',
      city: 'Puchong',
      state: 'Selangor'
    },
    credit: 0,
  },
]

module.exports = users
