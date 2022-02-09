const { model, Schema } = require('mongoose');

const paymentSchema = new Schema(
  {
    users: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
    },
    duration: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = model('Payment', paymentSchema);
