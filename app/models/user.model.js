module.exports = mongoose => {
   const User = mongoose.model(
      "user",
      mongoose.Schema(
         {
            firstName: String,
            lastName: String,
            email: String,
            phoneNumber: Number,
            imageUrl: String,
            dateOfBirth: Date,
            role: String,
            badges: [String],
            isActive: Boolean,
            enrolledClasses: [Map],
         },
         { timestamps: true },
      )
   );
   return User;
};