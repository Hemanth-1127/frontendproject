import { Award, Eye } from 'lucide-react';
import { Certificate } from '../../lib/supabase';

type CertificateCardProps = {
  certificate: Certificate;
};

export default function CertificateCard({ certificate }: CertificateCardProps) {
  return (
    <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg border-2 border-orange-200 p-5 hover:shadow-lg transition">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Award className="w-6 h-6 text-orange-600" />
          <h4 className="font-semibold text-gray-800">{certificate.title}</h4>
        </div>
        <Eye className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Issued by:</span>
          <span className="font-medium text-gray-800">{certificate.issued_by}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Issue Date:</span>
          <span className="font-medium text-gray-800">
            {new Date(certificate.issue_date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </span>
        </div>
      </div>
    </div>
  );
}
