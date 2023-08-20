import { Subscription } from "rxjs";

export class FileUploadModel {
  data: File | undefined;
  state: string | undefined;
  inProgress: boolean | undefined;
  progress: number | undefined;
  canRetry: boolean | undefined;
  canCancel: boolean | undefined;
  sub?: Subscription;
}