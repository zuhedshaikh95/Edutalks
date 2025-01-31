import { Avatar, AvatarGroup, Badge, Box, Button, Flex, Grid, GridItem, Image, Text, useToast } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { FaArrowRight, FaClock, FaConfluence, FaFacebookMessenger, FaGift, FaQuestion } from 'react-icons/fa'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Head from 'next/head'
import { useSelector } from 'react-redux'
import axios from 'axios'

function referral() {
  const toast = useToast()
  const { user } = useSelector(state => state.auth)
  const [referrals, setReferrals] = React.useState(null)
  useEffect(() => {
    if (!user) return
    const response = axios.get(`/api/referal/${user.referalCode}`).then(res => {
      setReferrals(res.data?.referal?.referalcount)
    })
  }, [user])


  return (
    <>
      <Head>
        <title>Referral - Hackathon</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>
        <Navbar />
        <Box bg='#FFF5E5'>
          <Grid templateColumns="repeat(2, 1fr)" gap={12} mx={{ base: '4', md: '10', lg: '20', xl: '32' }} py='16' px={10}>
            <GridItem colSpan={{ base: 2, md: 1 }}>
              <Box>
                <Text w='90%' fontWeight="bold" textColor='#522C2C' fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}>
                  Refer friends, Get one month subscription free
                </Text>
                <Flex mt={4} bg='white' p={4} borderRadius='md' gap='4' alignItems='center'>
                  <AvatarGroup size='sm' max={2}>
                    <Avatar name='Ryan Florence' src='https://bit.ly/ryan-florence' />
                    <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
                    <Avatar name='Kent Dodds' src='https://bit.ly/kent-c-dodds' />
                    <Avatar name='Prosper Otemuyiwa' src='https://bit.ly/prosper-baba' />
                    <Avatar name='Christian Nwamba' src='https://bit.ly/code-beast' />
                  </AvatarGroup>
                  <Text fontSize="sm" fontWeight="bold" textColor='#522C2C'> 231 learners have earned 3.9 years of subscription </Text>
                </Flex>
                <Flex mt={4} bg='white' p={4} borderRadius='md' gap='4'>
                  <Box w='70%'>
                    <Text fontSize="xs" fontWeight="bold" textColor='#522C2C'> {
                      user ? 'Here Is Your Referral Code' : 'You Need To Login To Get Your Referral Code'
                    } </Text>
                    <Text fontSize="2xl" fontWeight="bold" textColor='#522C2C'> {user ? user.referalCode : 'XXXXXX'} </Text>
                  </Box>
                  <Button colorScheme="orange" h='auto' w='30%' onClick={() => {
                    if (!user) {
                      toast({
                        title: 'Please Login First To Start Referring',
                        description: 'You need to login to get your referral code',
                        status: 'info',
                        duration: 3000,
                        position: 'top',
                        isClosable: true,
                      })
                    }
                  }}
                  > Refer </Button>
                </Flex>
              </Box>
            </GridItem>
            <GridItem colSpan={1} display={{ base: 'none', md: 'block' }}>
              <Box>
                <Image src="https://static.uacdn.net/referrals/free_user_hero_card_web_new.png?q=75&w=1000&fm=webp" alt="referral" w='100%' />
              </Box>
            </GridItem>
          </Grid>
          <Box mx={{ base: '4', md: '10', lg: '20', xl: '32' }} mt='-8' mb='24' px={10}>
            {/* <Text fontWeight="bold" textColor='#522C2C' fontSize={{ base: '2xl' }}>
            How it works
          </Text> */}
            <Grid templateColumns="repeat(2, 1fr)" gap={12} pt='8' pb='16' >
              <GridItem colSpan={{ base: 2, md: 1 }} bg='white' p={4} borderRadius='md'>
                <Box>
                  <Text fontWeight="bold" textColor='#522C2C' fontSize={{ base: 'xl', lg: '2xl' }}>
                    Refer a friend
                  </Text>
                  <Text mt={4} fontSize="md" textColor='#522C2C'>
                    Share your referral code with your friends and family. When they sign up for a free account, you’ll get one month of free subscription.
                  </Text>
                </Box>
              </GridItem>
              <GridItem colSpan={{ base: 2, md: 1 }} bg='white' p={4} borderRadius='md'>
                <Box>
                  <Text fontWeight="bold" textColor='#522C2C' fontSize={{ base: 'xl', lg: '2xl' }}>
                    Earn rewards
                  </Text>
                  <Text mt={4} fontSize="md" textColor='#522C2C'>
                    When your friends sign up for a free account, you’ll get one month of free subscription.
                  </Text>
                </Box>
              </GridItem>
            </Grid>
          </Box>
        </Box>
        <Box>
          <Box mx={{ base: '4', md: '10', lg: '20', xl: '32' }} mt='-12' px={10}>
            <Grid templateColumns="repeat(8, 1fr)" gap={12} pb='16' >
              <GridItem colSpan={{ base: 8, md: 5 }} bg='white' p={4} borderRadius='md'>
                <Text fontWeight="bold" textColor='#522C2C' fontSize={{ base: 'xl', lg: '2xl' }}> Your Referrals </Text>
                <Grid templateColumns="repeat(2, 1fr)" gap='4' mt={4}>
                  {
                    referrals ? referrals.map((referral, index) => (
                      <GridItem key={index} colSpan={{ base: 2, md: 1 }} bg='white' p={4} borderRadius='md' border='1px solid' borderColor='gray.100'>
                        <Box>
                          <Text fontWeight="bold" textColor='#522C2C' fontSize={{ base: 'xl', lg: '2xl' }}>{referral.name}</Text>
                          <Flex alignItems='center' gap={2}>
                            <FaClock />
                            <Text mt='1' fontSize="md" textColor='#522C2C'>{new Date(referral.subscriptions.startdate).toDateString()}</Text>
                          </Flex>
                          <Flex alignItems='center' gap={2}>
                            <FaFacebookMessenger />
                            <Text mt='1' fontSize="md" textColor='#522C2C'>{referral.email}</Text>
                          </Flex>
                          <Badge size='xl' px='4' py='1' mt='3' colorScheme="green">Status: &nbsp; Active</Badge>
                        </Box>
                      </GridItem>
                    )) : <Text> No Referrals Yet </Text>
                  }
                </Grid>
              </GridItem>
              <GridItem colSpan={{ base: 8, md: 3 }} bg='white' p={4} borderRadius='md'>
                <Text fontWeight="bold" textColor='#522C2C' fontSize={{ base: 'xl', lg: '2xl' }}> More On Rewards </Text>
                <Box border='1px solid' borderColor='gray.100' borderRadius='md' p={4} mt={4}>
                  <Flex justifyContent='space-between' alignItems='center'>
                    <Flex alignItems='center' gap='2'>
                      <FaGift />
                      <Text fontSize="md" textColor='#522C2C'> 1 month of free subscription </Text>
                    </Flex>
                    <FaArrowRight />
                  </Flex>
                </Box>
                <Box border='1px solid' borderColor='gray.100' borderRadius='md' p={4} mt={4}>
                  <Flex justifyContent='space-between' alignItems='center'>
                    <Flex alignItems='center' gap='2'>
                      <FaConfluence />
                      <Text ml={2} fontSize="md" textColor='#522C2C'> Terms And Condition </Text>
                    </Flex>
                    <FaArrowRight />
                  </Flex>
                </Box>
                <Box border='1px solid' borderColor='gray.100' borderRadius='md' p={4} mt={4}>
                  <Flex justifyContent='space-between' alignItems='center'>
                    <Flex alignItems='center' gap='2'>
                      <FaQuestion />
                      <Text ml={2} fontSize="md" textColor='#522C2C'> Frequently Asked Questions </Text>
                    </Flex>
                    <FaArrowRight />
                  </Flex>
                </Box>

              </GridItem>
            </Grid>
          </Box>
        </Box>
        <Footer />
      </Box>
    </>
  )
}

export default referral