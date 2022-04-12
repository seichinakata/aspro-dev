import Head from 'next/head'
import Image from 'next/image'
import { ThemeProvider } from '@mui/material/styles';
// import styles from '../styles/Home.module.css'
import theme from '../src/theme';
import Layout from '../components/Layout'

export default function Home() {

  return (
    <>
      <Layout />
    </>
  )
}
