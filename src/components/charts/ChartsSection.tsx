import { AnimatedLineChart } from './AnimatedLineChart';
import PieChart from './PieChart';

export function ChartsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Real-Time Analytics</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Track your social media performance with beautiful, interactive charts
            and get insights that matter.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <PieChart />
          <AnimatedLineChart />
        </div>
      </div>
    </section>
  );
}