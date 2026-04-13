import {
  TotoroBirthdayInvitation,
  type TotoroBirthdayInvitationProps,
} from "./TotoroBirthdayInvitation";

export type BirthdayInvitationProps = TotoroBirthdayInvitationProps;

export function BirthdayInvitation(props: BirthdayInvitationProps) {
  return <TotoroBirthdayInvitation {...props} />;
}
