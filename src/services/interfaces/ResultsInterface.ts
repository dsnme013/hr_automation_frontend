export interface Job { title: string }
export interface Candidate {
  id: string | number;
  name: string; email: string;
  exam_link_sent: boolean; exam_completed: boolean;
  assessment_invite_link?: string; link_expired?: boolean;
  exam_percentage?: number; exam_completed_date?: string;
  exam_link_sent_date?: string; final_status?: string; exam_feedback?: string;
}
