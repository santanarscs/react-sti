import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-duplicates
import { format } from 'date-fns';
// eslint-disable-next-line import/no-duplicates
import ptBR from 'date-fns/locale/pt-BR';
import { FiLoader } from 'react-icons/fi';
import api from '../../services/api';
import { Container, HeadContent, Content, LoadingContainer } from './styles';

const LineChart = React.lazy<any>(() => import('../../components/LineChart'));

interface IDocumentData {
  _id: number;
  number: string;
  author: string;
  numberSEI: string;
  manager: {
    name: string;
  };
  address: string;
  dateAudience: Date | null;
  formattedDate?: string;
}
const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [documents, setDocuments] = useState<IDocumentData[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [dataLineChart, setDataLineChart] = useState<number[]>([]);
  useEffect(() => {
    async function loadData(): Promise<void> {
      setLoading(true);
      const documentsResponse = await api.get('documents-month');
      const managersResponse = await api.get('managers');

      // formata documents com data;
      const formattedDocuments = documentsResponse.data.map(
        (document: IDocumentData) => ({
          ...document,
          formattedDate: document.dateAudience
            ? format(
                new Date(document.dateAudience),
                "'Dia' dd 'de' MMMM', às ' HH:mm'h'",
                { locale: ptBR },
              )
            : 'Data não informada',
        }),
      );
      setDocuments(formattedDocuments);
      // formata labels
      const formattedLabels = managersResponse.data.map(
        (manager: { name: string }) => manager.name,
      );
      setLabels(formattedLabels);
      setLoading(false);
    }
    loadData();
  }, []);

  useEffect(() => {
    const data: number[] = [];
    labels.forEach((manager: string): void => {
      const item = documents.filter(
        (document: IDocumentData) => document.manager.name === manager,
      ).length;
      data.push(item);
    });
    setDataLineChart(data);
  }, [labels, documents]);

  return (
    <Container>
      <HeadContent>
        <h1>Dashboard</h1>
      </HeadContent>
      <Content>
        <h2>Audiências do Mês</h2>
        {loading ? (
          <LoadingContainer>
            <FiLoader />
          </LoadingContainer>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Processo SEI </th>
                <th>Autor</th>
                <th>Preposto</th>
                <th>Processo Judicial</th>
                <th>Data da audiência</th>
                <th>Endereço</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((document) => (
                <tr key={document._id}>
                  <td>{document.numberSEI}</td>
                  <td>{document.author}</td>
                  <td>{document.manager.name}</td>
                  <td>{document.number}</td>
                  <td>{document.formattedDate}</td>
                  <td>{document.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Content>
      <Content>
        <h2>Audiências por preposto</h2>
        <React.Suspense
          fallback={(
            <LoadingContainer>
              <FiLoader />
            </LoadingContainer>
          )}
        >
          <LineChart
            data={[
              {
                label: 'Número de audiencias',
                data: dataLineChart,
                backgroundColor: 'rgba(46, 204, 113, 0.3)',
              },
            ]}
            labels={labels}
          />
        </React.Suspense>
      </Content>
    </Container>
  );
};
export default Dashboard;
