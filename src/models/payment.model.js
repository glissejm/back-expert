const { model, Schema } = require('mongoose');

const paymentSchema = new Schema(
  {
    user: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
    },
    status: Boolean,
  },
  {
    timestamps: true,
  }
);

module.exports = model('Payment', paymentSchema);
