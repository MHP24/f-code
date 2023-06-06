export const suspendAccount = (username: string) => {
  return (
    `Dear ${username},\n\n` +
    `We regret to inform you that your account has been permanently suspended due to a violation of our user profile guidelines. At FCode, we strive to maintain a respectful and safe community for all our users, and unfortunately, the content on your profile has violated our policies.\n\n` +
    `After careful review and consideration, we have determined that the nature of the inappropriate content is severe and goes against the principles we uphold. As a result, your account has been permanently suspended, and you will no longer have access to it or any features on our platform.\n\n` +
    `We take user conduct and the integrity of our community seriously. Our guidelines are in place to ensure a positive and inclusive environment for everyone. It is essential that all our members respect these guidelines and contribute responsibly.\n\n` +
    `Please note that this decision is final, and there will be no opportunity to reactivate your account. We kindly request that you refrain from attempting to create another account or access our platform in any unauthorized manner.\n\n` +
    `If you have any questions or concerns regarding this decision, please feel free to contact our support team at fcodesystemsupport@outlook.com. They will be able to provide further clarification, but please understand that the suspension is irreversible.\n\n` +
    `We appreciate your past participation in our community, but regrettably, we must enforce this permanent suspension based on the violations committed.\n\n` +
    `Thank you for your understanding\n\n` +
    `Sincerely,\n\n` +
    `FCode`
  );
}
