import { Layout } from './components/layout/Layout';
import { DashboardPage } from './components/dashboard/DashboardPage';
import { CandidateDetail } from './components/candidate/CandidateDetail';
import { UploadPage } from './components/upload/UploadPage';
import { JobBriefPage } from './components/jobs/JobBriefPage';
import { useStore } from './store/useStore';

export default function App() {
  const currentPage = useStore((s) => s.currentPage);
  const selectedId = useStore((s) => s.selectedCandidateId);

  const page =
    currentPage === 'candidate' && selectedId ? (
      <CandidateDetail />
    ) : currentPage === 'upload' ? (
      <UploadPage />
    ) : currentPage === 'job' ? (
      <JobBriefPage />
    ) : (
      <DashboardPage />
    );

  return <Layout>{page}</Layout>;
}
