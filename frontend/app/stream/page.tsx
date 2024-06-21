'use client';

import VideoPlayer from '@/components/VideoPlayer';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';
import { useSearchParams } from 'next/navigation';

export default function StreamPage() {
  const searchParams = useSearchParams();
  const url = searchParams.get('url');
  const pathname = searchParams.get('pathname');
  const size = searchParams?.get('size');
  const uploadedAt = searchParams?.get('uploadedAt');

  return (
    <div className='flex align-middle flex-col'>
      <VideoPlayer />
      <div className='mt-4 ml-10 w-11/12 justify-center mb-4'>
        <Table aria-label='Example static collection table'>
          <TableHeader>
            <TableColumn>VIDEO DETAILS</TableColumn>
            <TableColumn> </TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key='1'>
              <TableCell>PATHNAME</TableCell>
              <TableCell>{pathname}</TableCell>
            </TableRow>
            <TableRow key='2'>
              <TableCell>URL</TableCell>
              <TableCell>{url}</TableCell>
            </TableRow>
            <TableRow key='3'>
              <TableCell>SIZE</TableCell>
              <TableCell>{size}</TableCell>
            </TableRow>
            <TableRow key='4'>
              <TableCell>UPLOADED AT</TableCell>
              <TableCell>{uploadedAt}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
